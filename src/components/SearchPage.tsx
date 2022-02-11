import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import style from "../styles/modules/SearchPage.module.scss";
import { randomMenu } from "../util/test";
import { Autocomplete } from "./system";
import { RatedListItem } from "./system/List";

const SearchPage: React.FC = (): JSX.Element => {
  const [results, setResults] = useState<Array<Menu>>([]);
  const [filter, setFilter] = useState<string>("");
  const searchbarRef = useRef<HTMLDivElement>(null);

  const fetchResults = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (results.length < 50) setResults([...results, randomMenu()]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver((entries: Array<IntersectionObserverEntry>) => {
      if (entries[0]?.isIntersecting) {
        //handle intersect event
        //create searchbar context
      }
    });
    observer.observe(searchbarRef.current as any);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <TopWave />
      <section className={style["searchpage-container"]}>
        <div className={style["searchpage-content"]}>
          <div ref={searchbarRef} className={style["searchpage-searchbar"]}>
            <Autocomplete fullWidth onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(event?.target?.value || "")} options={results.map(({ title }) => title)} label={"Menü suchen"} />
          </div>
          <div className={style["searchpage-menus"]}>
            {results.map((menu: Menu, index: number) => {
              if (menu.title.toLowerCase().includes(filter.toLowerCase())) return <RatedListItem key={index} score={index + 1} title={menu.title} votes={Math.floor(Math.random() * 10)} />;
            })}
          </div>
        </div>
      </section>
    </>
  );
};

/**
 * Top wave component
 */

const TopWave: React.FC = (): JSX.Element => {
  return (
    <section className={style["wave-container"]}>
      <div className={style["background"]} />
      <svg preserveAspectRatio={"none"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill-opacity="1"
          d="M0,96L60,85.3C120,75,240,53,360,69.3C480,85,600,139,720,154.7C840,171,960,149,1080,122.7C1200,96,1320,64,1380,48L1440,32L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default SearchPage;
