import { NextPage, NextPageContext } from "next";
import React from "react";

interface ErrorPageProps {
  code: number; //http error code number
}

const ErrorPage: NextPage<ErrorPageProps> = ({ code }): JSX.Element => {
  return <></>;
};

ErrorPage.getInitialProps = async (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const code: number = (res ? res.statusCode : err ? err.statusCode : 404) || 400;
  return { code: code };
};

export default ErrorPage;
