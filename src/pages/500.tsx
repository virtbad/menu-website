import { NextPage } from "next";
import React from "react";
import Error from "../components/system/Error";

/**
 * Static optimized page for server side errors
 */

const ServerErrorPage: NextPage = (): JSX.Element => {
  return <Error code={500} />;
};

export default ServerErrorPage;
