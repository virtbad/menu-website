import React, { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { Menu } from "../classes/Menu.class";
import style from "../styles/modules/Home.module.scss";
import { Button, MenuCard } from "./system";
import { RatedListItem } from "./system/List";

interface HomePageProps {
  menus: Array<Menu>;
  count: number;
  upcoming: Array<Menu>;
}

/**
 * Home landing page
 */

const HomePage: React.FC<HomePageProps> = ({ menus, count, upcoming }): JSX.Element => {
  return (
    <section className={style["home-container"]}>
      <Today menus={menus} />
      <UpcomingMenus menus={upcoming} />
      <Bubbles count={count} />
    </section>
  );
};

interface TodayProps {
  menus: Array<Menu>;
}

/**
 * Todays menus component
 */

const Today: React.FC<TodayProps> = ({ menus }): JSX.Element => {
  return (
    <section data-nosnippet className={style["today-container"]} data-closed={menus.length === 0}>
      <div className={style["today-content"]}>
        {menus
          .sort((a: Menu, b: Menu) => a.channel - b.channel)
          .map((menu: Menu) => {
            return <MenuCard disabled={true} href={`/menu/${menu.uuid}`} key={menu.uuid} menu={menu} />;
          })}
        {menus.length === 0 && (
          <div className={style["closed-container"]}>
            <h2 children={"Geschlossen"} />
            <span children={"Die Mensa hat heute geschlossen"} className={style["noresult"]} />
          </div>
        )}
      </div>
    </section>
  );
};

interface UpcomingMenusProps {
  menus: Array<Menu>;
}

/**
 * Upcoming menus component
 */

const UpcomingMenus: React.FC<UpcomingMenusProps> = ({ menus }): JSX.Element => {
  return (
    <section data-nosnippet className={style["upcoming-container"]}>
      <UpperWave />
      <div className={style["upcoming-content"]}>
        <h2 className={style["upcoming-title"]} children={"Zukünftige Menüs"} />
        <div className={style["upcoming-menus"]}>
          {menus
            .sort((a: Menu, b: Menu) => a.date.getTime() - b.date.getTime())
            .map((menu: Menu, index: number) => {
              return <RatedListItem  href={`/menu/${menu.uuid}`} disabled background={"alt"} theme={"dark"} key={index} menu={menu} />;
            })}
          {menus.length === 0 && <span style={{ alignSelf: "flex-start" }} className={style["noresult"]} children={"Es konnten keine zukünftigen Menüs geladen werden"} />}
        </div>
      </div>
      <LowerWave />
    </section>
  );
};

/**
 * Upper wave component
 */

const UpperWave: React.FC = (): JSX.Element => {
  return (
    <section className={style["wave-container"]}>
      <svg preserveAspectRatio={"none"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 320">
        <path d="M0,224L40,208C80,192,160,160,240,160C320,160,400,192,480,213.3C560,235,640,245,720,245.3C800,245,880,235,960,240C1040,245,1120,267,1200,266.7C1280,267,1360,245,1400,234.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z" />
      </svg>
    </section>
  );
};

/**
 * Lower wave component
 */

const LowerWave: React.FC = (): JSX.Element => {
  return (
    <section className={style["wave-container"]}>
      <svg preserveAspectRatio={"none"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path d="M0,32L40,37.3C80,43,160,53,240,74.7C320,96,400,128,480,144C560,160,640,160,720,138.7C800,117,880,75,960,64C1040,53,1120,75,1200,90.7C1280,107,1360,117,1400,122.7L1440,128L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
      </svg>
    </section>
  );
};

interface BubblesProps {
  count: number;
}

/**
 * Bubbles component
 */

const Bubbles: React.FC<BubblesProps> = ({ count }): JSX.Element => {
  return (
    <section className={style["bubbles-container"]}>
      <MenuBubble />
      <StatisticsBubble count={count} />
    </section>
  );
};

/**
 * Menu bubble component
 */

const MenuBubble: React.FC = (): JSX.Element => {
  const bubble: JSX.Element = (
    <svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
      <path d="M462,276.5Q464,313,440,340.5Q416,368,385.5,383Q355,398,329,416.5Q303,435,271.5,449.5Q240,464,206,457Q172,450,146,427.5Q120,405,91,387Q62,369,46,338.5Q30,308,16,274Q2,240,10.5,204Q19,168,34,134.5Q49,101,86.5,91Q124,81,146,50.5Q168,20,204,16.5Q240,13,273,24.5Q306,36,330.5,59Q355,82,376.5,103.5Q398,125,430.5,146.5Q463,168,461.5,204Q460,240,462,276.5Z" />
    </svg>
  );
  return <BaseBubble bubble={bubble} title={"Alle Menüs"} href={"/all"} button={"Zur Liste"} description={"Sieh dir alle Menüs an, die es jemals in der Mensa gegeben hat"} />;
};

interface StatisticsBubbleProps {
  count: number;
}

/**
 * Statistics bubble component
 */

const StatisticsBubble: React.FC<StatisticsBubbleProps> = ({ count }): JSX.Element => {
  const reducedCount: number = count - 1 - ((count - 1) % 50);
  const counterRef = useRef(null);
  const { reset, start } = useCountUp({
    start: 0,
    end: reducedCount,
    duration: 4,
    separator: "'",
    ref: counterRef,
    prefix: "Mehr als ",
    suffix: " Menüs!",
    startOnMount: true,
  });

  useEffect(() => {
    let started: boolean = false;
    const observer = new IntersectionObserver(([entry]: Array<IntersectionObserverEntry>) => {
      if (entry.isIntersecting && !started) {
        reset();
        start();
        started = true;
      }
    });
    observer.observe(counterRef.current as any);

    return () => {
      observer.disconnect();
    };
  }, []);

  const bubble: JSX.Element = (
    <svg preserveAspectRatio={"none"} viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
      <path d="M462.5,277Q468,314,437,337Q406,360,383.5,383Q361,406,334.5,427Q308,448,274,447Q240,446,206.5,446.5Q173,447,143.5,430Q114,413,95.5,385.5Q77,358,64.5,329.5Q52,301,34.5,270.5Q17,240,20,205Q23,170,42,140Q61,110,93.5,96.5Q126,83,147.5,52.5Q169,22,204.5,28.5Q240,35,271.5,40.5Q303,46,341,47.5Q379,49,393.5,83.5Q408,118,424,146.5Q440,175,448.5,207.5Q457,240,462.5,277Z" />
    </svg>
  );

  return (
    <BaseBubble
      bubble={bubble}
      title={<span ref={counterRef} />}
      button={"Zur Suche"}
      href={"/search"}
      description={`Durchsuche die ${count.toLocaleString("de").replace(".", "'")} Menüs, welche über mehrere Jahre hinweg gesammelt wurden und finde deine Lieblingsmenüs`}
    />
  );
};

interface BaseBubbleProps {
  bubble: JSX.Element;
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  href?: string;
  button?: string;
}

/**
 * Base bubble component for creating directly styled bubbles
 */

const BaseBubble: React.FC<BaseBubbleProps> = ({ bubble, title, description, href, button = "Mehr" }): JSX.Element => {
  return (
    <section className={style["bubble-container"]}>
      <div className={style["bubble-background"]} children={bubble} />
      <div className={style["bubble-text"]}>
        <h2 className={style["bubble-text-title"]} children={title} />
        <div className={style["bubble-text-description"]} children={description} />
        <div className={style["bubble-text-button"]} children={<Button theme={"green"} children={button} forwardIcon href={href} />} />
      </div>
    </section>
  );
};

export default HomePage;
