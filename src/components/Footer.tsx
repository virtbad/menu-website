import React from "react";
import { useVersion } from "../hooks/VersionContext";
import style from "../styles/modules/Footer.module.scss";
import { Link } from "./system";

/**
 * Footer component
 */

const Footer: React.FC = (): JSX.Element => {
  const { frontend, backend } = useVersion();
  return (
    <footer className={style["footer-container"]}>
      <section className={style["footer-items"]}>
        <FooterSection title={"Navigation"}>
          <Link href={"/search"} children={"Menusuche"} />
        </FooterSection>
        <FooterSection title={"API"} />
      </section>
      <section className={style["footer-endnote"]}></section>
    </footer>
  );
};

interface FooterSectionProps {
  title: string;
}

/**
 * Footer section component
 */

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }): JSX.Element => {
  return (
    <section className={style["footer-section"]}>
      <h4 className={style["footer-section-title"]} children={title} />
      <div className={style["footer-section-entries"]} children={children} />
    </section>
  );
};

export default Footer;
