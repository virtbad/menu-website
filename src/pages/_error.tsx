import { NextPage, NextPageContext } from "next";
import React from "react";
import Error from "../components/system/Error";

interface ErrorPageProps {
  code: number; //http error code number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ code }): JSX.Element => {
  return <Error code={code} />;
};

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const code: number = (res ? res.statusCode : err ? err.statusCode : 404) || 400;
  return { code: code };
};

export default ErrorPage;
