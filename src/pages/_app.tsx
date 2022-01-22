import { CacheProvider } from "@emotion/react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import "../styles/global.scss";
import { createEmotionCache } from "./_document";

/**
 * Wrapper page to wrap components around all pages of the site
 */

const Wrapper: NextPage<AppProps> = (props: AppProps): JSX.Element => {
  const clientSideEmotionCache = createEmotionCache();

  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props as any;

  return (
    <CacheProvider value={emotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
};

export default Wrapper;
