import { LogLevel } from "@azure/msal-common";
import { Logger } from "../classes/Logger.class";
import { authLogsEnabled, isLocal } from "./global.config";

export const msalConfig = {
  auth: {
    clientId: "e752c4e4-545c-489e-9bb1-10f7863a9161",
    authority: "https://login.microsoftonline.com/c62e58b8-7da9-41f4-83f3-3a2ed82499ac",
    redirectUri: isLocal ? "http://localhost:8000" : "https://intern-next.netlify.app",
    knownAuthorities: ["c62e58b8-7da9-41f4-83f3-3a2ed82499ac"],
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
  scopes: ["e752c4e4-545c-489e-9bb1-10f7863a9161/.default"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
