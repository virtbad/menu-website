import React from "react";
import style from "../styles/modules/Layout.module.scss";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
  hideHeaderSearchbar?: boolean;
}

/**
 * Layout component for the page layout
 */

const Layout: React.FC<LayoutProps> = ({ children, hideHeaderSearchbar = false }): JSX.Element => {
  return (
    <>
      <Header hideSearchbar={hideHeaderSearchbar} />
      <main className={style["layout-container"]}>
        <section className={style["layout-content"]} children={children} />
        <Footer />
      </main>
    </>
  );
};

export default Layout;
