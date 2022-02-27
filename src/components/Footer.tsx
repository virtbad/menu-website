import GitHubIcon from "@mui/icons-material/GitHub";
import TelegramIcon from "@mui/icons-material/Telegram";
import React from "react";
import { useVersion } from "../hooks/VersionContext";
import style from "../styles/modules/Footer.module.scss";
import { apiUrl } from "../util/global.config";
import { Link } from "./system";

/**
 * Footer component
 */

const Footer: React.FC = (): JSX.Element => {
  const { frontend, backend } = useVersion();
  return (
    <footer className={style["footer-container"]}>
      <section className={style["footer-items"]}>
        <FooterSection
          title={`Frontend`}
          version={frontend || "?.?.?"}
          source={process.env.NEXT_PUBLIC_FRONTEND_REPO}
          links={[
            { title: "Home", href: "/" },
            { title: "Menusuche", href: "/search" },
            { title: "Alle", href: "/all" },
          ]}
        />

        <FooterSection
          title={"Backend"}
          version={backend || "?.?.?"}
          source={process.env.NEXT_PUBLIC_BACKEND_REPO}
          links={[
            { title: "API", href: apiUrl },
            { title: "Dokumentation", href: `${process.env.NEXT_PUBLIC_BACKEND_REPO}/tree/main/docs` },
          ]}
        />
        <FooterSection title={"Disclaimer"}>
          <div className={style["footer-disclaimer"]} children={`Diese Seite ist kein Teil der SV-Group Restaurantkette und gehört nicht der ${process.env.NEXT_PUBLIC_LOCATION}`} />
        </FooterSection>
      </section>
      <section className={style["footer-endnote"]}>
        <div className={style["footer-icons"]}>
          {process.env.NEXT_PUBLIC_TELEGRAM && <Link noUnderline href={process.env.NEXT_PUBLIC_TELEGRAM} children={<TelegramIcon fontSize={"small"} />} />}
          {process.env.NEXT_PUBLIC_ORGA && <Link noUnderline href={process.env.NEXT_PUBLIC_ORGA} children={<GitHubIcon fontSize={"small"} />} />}
        </div>
        <code className={style["footer-copyright"]} children={`Copyright © ${new Date().getFullYear()}`} />
      </section>
    </footer>
  );
};

interface FooterSectionProps {
  title: string;
  links?: Array<{ title: string; href: string }>;
  version?: string;
  source?: string;
}

/**
 * Footer section component
 */

const FooterSection: React.FC<FooterSectionProps> = ({ title, links, version, source, children }): JSX.Element => {
  return (
    <section className={style["footer-section"]}>
      <div className={style["footer-section-title"]}>
        <h5 children={title} />
        {version && <code children={`v${version}`} />}
        {false && <GitHubIcon fontSize={"small"} />}
      </div>
      <h5 className={style["footer-section-title"]} children={title} />
      <div className={style["footer-section-entries"]}>
        {links &&
          links.map(({ title, href }, index: number) => {
            return <Link noUnderline href={href} children={title} key={index} />;
          })}
        {children}
        {source && <Link noUnderline href={source} children={"Quellcode"} />}
      </div>
    </section>
  );
};

export default Footer;
