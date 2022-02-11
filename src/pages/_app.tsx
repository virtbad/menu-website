import { CacheProvider } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { VersionProvider } from "../hooks/VersionContext";
import "../styles/global.scss";
import { createEmotionCache } from "./_document";
import {createTheme, ThemeProvider} from "@mui/material";

/**
 * Wrapper page to wrap components around all pages of the site
 */

const Wrapper: NextPage<AppProps> = (props: AppProps): JSX.Element => {
  const clientSideEmotionCache = createEmotionCache();

  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props as any;

  return (
          <CacheProvider value={emotionCache}>
                  <VersionProvider>
                      <Component {...pageProps} />
                  </VersionProvider>
          </CacheProvider>
  );
};

export default Wrapper;
