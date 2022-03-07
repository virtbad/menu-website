import { EventType, PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { CacheProvider } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { SWRConfig } from "swr";
import { Logger } from "../classes/Logger.class";
import { AuthProvider, useAuth } from "../hooks/AuthContext";
import { SearchbarProvider } from "../hooks/SearchbarContext";
import { ThemeProvider } from "../hooks/ThemeContext";
import { UserProvider } from "../hooks/UserContext";
import { VersionProvider } from "../hooks/VersionContext";
import "../styles/global.scss";
import { msalConfig } from "../util/auth.config";
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
  const { emotionCache = clientSideEmotionCache, ...rest } = props as any;

  const router: NextRouter = useRouter();
  msalInstance.setNavigationClient(new NavigationClient(router));

  return (
    <CacheProvider value={emotionCache}>
      <MsalProvider instance={msalInstance}>
        <SWRConfig value={{ revalidateOnFocus: false, shouldRetryOnError: false }}>
          <AuthProvider>
            <UserProvider>
              <VersionProvider>
                <ThemeProvider>
                  <SearchbarProvider>
                    <Container {...rest} />
                  </SearchbarProvider>
                </ThemeProvider>
              </VersionProvider>
            </UserProvider>
          </AuthProvider>
        </SWRConfig>
      </MsalProvider>
    </CacheProvider>
  );
};

const Container: React.FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  const { requestToken } = useAuth();
  const [cookies, _, removeCookie] = useCookies();

  useEffect(() => {
    if (cookies.query) removeCookie("query");
    //less than hourly interval to renew access token to prevent invalid access token errors
    const interval = setInterval(async () => {
      try {
        await requestToken();
        Logger.auth("Periodically refreshed access token");
      } catch (e) {
        Logger.auth("Periodic access token refresh failed");
      }
    }, 3500000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    requestToken()
      .then(() => {
        Logger.auth("Refreshed access token");
      })
      .catch(() => {
        Logger.auth("Access token refresh failed");
      });
  }, [pageProps]);

  return <Component {...pageProps} />;
};

export default Wrapper;
