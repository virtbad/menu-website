import React from "react";
import style from "../styles/modules/Header.module.scss";
import QuickProfile from "./QuickProfile";
import { Autocomplete, Avatar } from "./system";

interface HeaderProps {
  hideSearchbar?: boolean;
}

/**
 * Header component
 */

const Header: React.FC<HeaderProps> = ({ hideSearchbar = false }): JSX.Element => {
  return (
    <header className={style["header-container"]}>
      <div children={<Avatar size="small" />} />
      {!hideSearchbar ? <Autocomplete placeholder={"Menü suchen"} options={[]} /> : <span />}
      <div children={<QuickProfile />} />
    </header>
  );
};

export default Header;
