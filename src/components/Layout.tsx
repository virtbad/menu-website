import React from "react";
import style from "../styles/modules/Layout.module.scss";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {}

/**
 * Layout component for the page layout
 */

const Layout: React.FC<LayoutProps> = ({ children }): JSX.Element => {
  return (
    <main className={style["layout-container"]}>
      <Header />
      <section className={style["layout-content"]} children={children} />
      <Footer />
    </main>
  );
};

export default Layout;