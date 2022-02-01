import React from "react";
import style from "../styles/modules/MenuPage.module.scss";

const MenuPage: React.FC = (): JSX.Element => {
  return (
    <section className={style["menupage-container"]}>
      <MenuDivider />
      <div className={style["menupage-menu-container"]}></div>
      <div className={style["menupage-comments-container"]}></div>
    </section>
  );
};

const MenuDivider: React.FC = (): JSX.Element => {
  return <div className={style["menupage-divider"]}></div>;
};

export default MenuPage;
