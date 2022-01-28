import React from "react";
import style from "../styles/modules/Home.module.scss";
import { MenuCard } from "./system";

/**
 * Home landing page
 */

const Home: React.FC = (): JSX.Element => {
  return (
    <section className={style["home-container"]}>
      <Today />
    </section>
  );
};

/**
 * Todays menus component
 */

const Today: React.FC = (): JSX.Element => {
  return (
    <section className={style["today-container"]}>
      <div className={style["menu-container"]}>
        <MenuCard uuid="" />
        <MenuCard uuid="" />
        <MenuCard uuid="" />
      </div>
      <UpperWave />
    </section>
  );
};

/**
 * Component for the upper wave
 */

const UpperWave: React.FC = (): JSX.Element => {
  return (
    <section className={style["upperwave-container"]}>
      <svg preserveAspectRatio={"none"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M0,224L40,208C80,192,160,160,240,160C320,160,400,192,480,213.3C560,235,640,245,720,245.3C800,245,880,235,960,240C1040,245,1120,267,1200,266.7C1280,267,1360,245,1400,234.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
      </svg>
    </section>
  );
};

export default Home;
