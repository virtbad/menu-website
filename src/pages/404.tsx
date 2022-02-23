import { NextPage } from "next";
import React from "react";
import Error from "../components/system/Error";

/**
 * Static optimized page for 404 errors
 */

const NotFoundPage: NextPage = (): JSX.Element => {
  return <Error code={404} />;
};

export default NotFoundPage;
