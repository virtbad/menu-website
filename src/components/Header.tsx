import React from "react";
import style from "../styles/modules/Header.module.scss";
import QuickProfile from "./QuickProfile";
import { Autocomplete, Avatar } from "./system";

/**
 * Header component
 */

const Header: React.FC = (): JSX.Element => {
  return (
    <header className={style["header-container"]}>
      <div children={<Avatar size="small" />} />
      <Autocomplete placeholder={"Menü suchen"} options={[]} />
      <div children={<QuickProfile />} />
    </header>
  );
};

export default Header;
