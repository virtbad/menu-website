import { CircularProgress } from "@mui/material";
import React from "react";
import style from "../../styles/modules/system/Loader.module.scss";

interface LoaderProps {
  full?: boolean | "screen" | "container";
}

/**
 * Loading spinner component
 */

const Loader: React.FC<LoaderProps> = ({ full = false }): JSX.Element => {
  const BaseLoader: JSX.Element = <CircularProgress classes={{ root: style["loader-spinner"] }} />;
  if (full) return <div className={style["loader-container"]} data-full={full} children={BaseLoader} />;
  else return BaseLoader;
};

export default Loader;
