import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { CacheProvider } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { Logger } from "../classes/Logger.class";
import { AuthProvider } from "../hooks/AuthContext";
import { SearchbarProvider } from "../hooks/SearchbarContext";
import { ThemeProvider } from "../hooks/ThemeContext";
import { VersionProvider } from "../hooks/VersionContext";
import "../styles/global.scss";
import { loginRequest, msalConfig } from "../util/auth.config";
import { NavigationClient } from "../util/NavigationClient";
import { createEmotionCache } from "./_document";

const msalInstance: PublicClientApplication = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) msalInstance.setActiveAccount(accounts[0]);

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && (event.payload as any).account) {
    const account = (event.payload as any).account;
    msalInstance.setActiveAccount(account);
  }
});

/**
 * Wrapper page to wrap components around all pages of the site
 */

const Wrapper: NextPage<AppProps> = (props: AppProps): JSX.Element => {
  const clientSideEmotionCache = createEmotionCache();
  const [token, setToken] = useState<{ token: string; exp: Date }>(null);
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props as any;

  const router: NextRouter = useRouter();
  msalInstance.setNavigationClient(new NavigationClient(router));

  useEffect(() => {
    if (!msalInstance.getActiveAccount()) return;
    msalInstance
      .acquireTokenSilent({ ...loginRequest, account: msalInstance.getActiveAccount() })
      .then((response) => {
        setToken({ token: response.accessToken, exp: response.expiresOn });
      })
      .catch(() => {
        setToken({ token: undefined, exp: undefined });
        msalInstance.acquireTokenRedirect({ ...loginRequest, account: msalInstance.getActiveAccount() }).catch(Logger.error);
      })
      .catch(Logger.error);

    const callbackId = msalInstance.addEventCallback((event) => {
      if (event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) {
        setToken({ token: (event.payload as any).accessToken, exp: (event.payload as any).expiresOn });
        Logger.auth("Refreshed access token");
      }
    });

    //less than hourly interval to renew access token to prevent invalid access token errors
    const interval = setInterval(() => {
      if (msalInstance.getActiveAccount()) {
        msalInstance
          .acquireTokenSilent({ ...loginRequest, account: msalInstance.getActiveAccount() })
          .then((response) => {
            setToken({ token: response.accessToken, exp: response.expiresOn });
            Logger.auth("Automatically refreshed access token");
          })
          .catch(() => {
            setToken({ token: undefined, exp: undefined });
            Logger.auth("Automated access token refresh failed");
            msalInstance.acquireTokenRedirect({ ...loginRequest, account: msalInstance.getActiveAccount() }).catch(Logger.error);
          })
          .catch(Logger.error);
      }
    }, 3500000);

    return () => {
      msalInstance.removeEventCallback(callbackId);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!msalInstance.getActiveAccount()) return;
    msalInstance
      .acquireTokenSilent({ ...loginRequest, account: msalInstance.getActiveAccount() })
      .then((response) => setToken({ token: response.accessToken, exp: response.expiresOn }))
      .catch(() => {
        setToken({ token: undefined, exp: undefined });
        msalInstance.acquireTokenRedirect({ ...loginRequest, account: msalInstance.getActiveAccount() }).catch(Logger.error);
      })
      .catch(Logger.error);
  }, [props]);

  return (
    <CacheProvider value={emotionCache}>
      <MsalProvider instance={msalInstance}>
        <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
          <AuthProvider fetching={token === null} token={token?.token} exp={token?.exp}>
            <VersionProvider>
              <ThemeProvider>
                <SearchbarProvider>
                  <Component {...pageProps} />
                </SearchbarProvider>
              </ThemeProvider>
            </VersionProvider>
          </AuthProvider>
        </SWRConfig>
      </MsalProvider>
    </CacheProvider>
  );
};

export default Wrapper;
