import { NextPage } from "next";
import { AppProps } from "next/app";
import "../styles/global.scss";

/**
 * Wrapper page to wrap components around all pages of the site
 */

const Wrapper: NextPage<AppProps> = (props: AppProps): JSX.Element => {
  const { Component, pageProps } = props;

  return <Component {...pageProps} />;
};

export default Wrapper;
