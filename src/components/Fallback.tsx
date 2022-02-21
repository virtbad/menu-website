import { CircularProgress } from "@mui/material";
import React from "react";
import style from "../styles/modules/Fallback.module.scss";
import Layout from "./Layout";

/**
 * Fallback component with loading spinner for fallback sites
 */

const Fallback: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <section className={style["fallback-container"]}>
        <CircularProgress classes={{ root: style["fallback-spinner"] }} />
      </section>
    </Layout>
  );
};

export default Fallback;
