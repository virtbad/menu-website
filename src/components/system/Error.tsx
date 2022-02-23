import React from "react";
import style from "../../styles/modules/system/Error.module.scss";
import Layout from "../Layout";

interface ErrorProps {
  code: number;
}

const Error: React.FC<ErrorProps> = ({ code }): JSX.Element => {
  return (
    <Layout>
      <section className={style["error-container"]}>
        <div className={style["error-content"]}>
          <BackgroundBlob />
          <div className={style["error-text"]}>
            <h1 children={"Fehler"} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

const BackgroundBlob: React.FC = (): JSX.Element => {
  return (
    <div className={style["error-blob-container"]}>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M39.6,-65.7C52.2,-61.2,64.1,-52.6,72.9,-40.9C81.6,-29.3,87.2,-14.6,88.8,1C90.5,16.6,88.3,33.2,79.5,44.7C70.7,56.2,55.3,62.6,40.9,67.3C26.6,72,13.3,75,0.8,73.6C-11.7,72.2,-23.4,66.5,-33.8,59.5C-44.3,52.6,-53.6,44.4,-59.8,34.3C-66,24.2,-69.2,12.1,-71.2,-1.1C-73.2,-14.4,-74,-28.8,-68.5,-40.2C-63,-51.6,-51.3,-60.1,-38.8,-64.7C-26.4,-69.3,-13.2,-70.1,0.1,-70.3C13.4,-70.6,26.9,-70.2,39.6,-65.7Z"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
};

export default Error;
