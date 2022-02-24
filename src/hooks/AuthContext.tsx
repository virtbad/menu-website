import { EventType } from "@azure/msal-browser";
import { AccountInfo, AuthenticationResult } from "@azure/msal-common";
import { useMsal } from "@azure/msal-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Logger } from "../classes/Logger.class";
import { loginRequest } from "../util/auth.config";
import { isLocal } from "../util/global.config";

interface AuthContext {
  token: string;
  requestToken: () => Promise<string>;
  logout: () => void;
}

const defaultValue: AuthContext = {
  token: null,
  requestToken: async () => "",
  logout: () => {},
};

export const AuthContext = React.createContext<AuthContext>(defaultValue);

interface AuthProviderProps {
  token?: string;
  exp?: Date;
  fetching?: boolean;
}

/**
 * Provider for the auth context to manage the logged in user
 */

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, token, exp, fetching = false }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const { instance } = useMsal();
  const [auth, setAuth] = useState<{ token: string; exp: Date }>({ token: token, exp: exp });
  const router = useRouter();

  useEffect(() => {
    if (instance.getActiveAccount() && !cookies.token) requestToken().catch(() => router.reload());
  });

  useEffect(() => {
    if (token && exp) setAuth({ token: token, exp: exp });
  }, [token, exp]);

  useEffect(() => {
    if (fetching) return;
    auth.token && setCookie("token", auth.token, { path: "/", expires: auth.exp });
    !auth.token && removeCookie("token");
  }, [auth]);

  const requestToken = async (): Promise<string> => {
    if (typeof window === "undefined") return;
    if (!instance.getActiveAccount()) await login();

    await instance.handleRedirectPromise();
    try {
      const response: AuthenticationResult = await instance.acquireTokenSilent({ scopes: loginRequest.scopes });
      setAuth({ token: response.accessToken, exp: response.expiresOn });
      return response.accessToken;
    } catch (e) {
      await instance.acquireTokenRedirect({ ...loginRequest, account: instance.getActiveAccount() });
    }
  };

  const login = (): Promise<AccountInfo> => {
    return new Promise(async (resolve, reject) => {
      try {
        await instance.handleRedirectPromise();
        await instance.loginRedirect();

        const loginCallback = (event: any) => {
          if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
            const account = event.payload.account;
            instance.setActiveAccount(account);
            resolve(account);
            instance.removeEventCallback(id);
          }
        };

        let id: string = instance.addEventCallback(loginCallback);
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = async (): Promise<void> => {
    setAuth({ token: undefined, exp: undefined });
    removeCookie("token");
    try {
      await instance.logoutRedirect({ account: instance.getActiveAccount(), postLogoutRedirectUri: isLocal ? `http://localhost:8000` : process.env.NEXT_PUBLIC_HOSTNAME });
    } catch (e) {
      Logger.error("Error whilst logging out", e);
    }
  };

  return <AuthContext.Provider value={{ token: cookies.token || auth.token, requestToken: requestToken, logout: logout }} children={children} />;
};

/**
 * Access the login token
 */

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};
