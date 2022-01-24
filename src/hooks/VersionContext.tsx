import { NextPage } from "next";
import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../util/global.config";

interface VersionContext {
  frontend: string;
  backend: string;
}

export const VersionContext = createContext<VersionContext>({ frontend: "", backend: "" });

/**
 * Provider for the version context to keep the versions of backend and frontend globally stored
 */

export const VersionProvider: NextPage = ({ children }): JSX.Element => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [data, setData] = useState<VersionContext>({ frontend: "", backend: "" });
  const { ...frontend } = useSWR(!loaded && "/api/", fetcher);
  const { ...backend } = useSWR(!loaded && "");

  useEffect(() => {
    if (!frontend.isValidating && !backend.isValidating && !loaded) {
      setData({
        frontend: frontend.data?.version || "",
        backend: backend.data?.version || "",
      });
      setLoaded(true);
    }
  }, [frontend, backend]);

  return <VersionContext.Provider value={data} children={children} />;
};

/**
 * Access the stored versions of the backend and frontend
 */

export const useVersion = (): VersionContext => {
  const context = useContext(VersionContext);

  if (context === undefined) {
    throw new Error("useVersion must be used within a VersionProvider");
  }
  return context;
};
