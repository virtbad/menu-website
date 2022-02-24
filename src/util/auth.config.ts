import { LogLevel } from "@azure/msal-common";
import { Logger } from "../classes/Logger.class";
import { authLogsEnabled, isLocal } from "./global.config";

export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_MSAL_CLIENTID,
    authority: `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MSAL_AUTHORITY}`,
    redirectUri: isLocal ? "http://localhost:8000" : process.env.NEXT_PUBLIC_HOSTNAME,
    knownAuthorities: [process.env.NEXT_PUBLIC_MSAL_AUTHORITY],
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii || !authLogsEnabled) return;
        switch (level) {
          case LogLevel.Error:
            Logger.error(message);
            return;
          case LogLevel.Info:
            Logger.info(message);
            return;
          case LogLevel.Verbose:
            Logger.info(message);
            return;
          case LogLevel.Warning:
            Logger.warning(message);
            return;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: [`${process.env.NEXT_PUBLIC_MSAL_CLIENTID}/.default`],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
