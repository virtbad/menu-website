import { CircularProgress } from "@mui/material";
import React from "react";
import Layout from "./Layout";

/**
 * Fallback component with loading spinner for fallback sites
 */

const Fallback: React.FC = (): JSX.Element => {
  return (
    <Layout>
      <div>
        <CircularProgress />
      </div>
    </Layout>
  );
};

export default Fallback;
