import React, { useEffect, useState } from "react";
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
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      return window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={style["header-container"]} data-background={visible}>
      <div children={<Avatar size="small" />} />
      {!hideSearchbar ? <Autocomplete placeholder={"Menü suchen"} options={[]} /> : <span />}
      <div children={<QuickProfile />} />
    </header>
  );
};

export default Header;
