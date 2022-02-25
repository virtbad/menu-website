import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/AllPage.module.scss";
import { RatedListItem } from "./system/List";
import Loader from "./system/Loader";

interface AllPageProps {
  menus: Array<Menu>;
}

/**
 * All page component
 */

const AllPage: React.FC<AllPageProps> = ({ menus }): JSX.Element => {
  let mounted: boolean = true;
  const [results, setResults] = useState<{ results: Array<Menu>; page: number }>({ results: menus || [], page: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);
  const loaderRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  const { getAllMenuResults } = useSearchbar();

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(([entry]: Array<IntersectionObserverEntry>) => setVisible(entry.isIntersecting));
    observer.observe(loaderRef.current as any);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    moreMenus();
  }, [visible]);

  const moreMenus = () => {
    if (loading || last) return;
    setLoading(true);
    getAllMenuResults(results.page)
      .then((menus: Array<Menu>) => {
        if (!mounted) return;
        if (menus.length === 0) setLast(true);
        setResults({ results: [...results.results, ...menus], page: results.page + 1 });
        setLoading(false);
      })
      .catch();
  };

  return (
    <>
      <TopWave />
      <section className={style["allpage-container"]}>
        <div className={style["allpage-content"]}>
          <h1 children={"Alle Menüs"} />
          <div className={style["allpage-menus"]}>
            {results.results
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((menu: Menu, index: number) => {
                return <RatedListItem disabled href={`/menu/${menu.uuid}`} key={`${index}-${menu.uuid}`} menu={menu} />;
              })}
            {results.results.length === 0 && <span className={style["noresult"]} children={"Keine Menüs gefunden"} />}
            <span id={"menu-spanner"} ref={loaderRef} />
            {loading && <div className={style["loader-container"]} children={<Loader />} />}
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
      <svg preserveAspectRatio={"none"} version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1440 320" xmlSpace="preserve">
        <path
          d="M0,158l48,5.3c48,5.7,144,15.7,240,16c96-0.3,192-10.3,288,16c96,26.7,192,90.7,288,112c96,21.7,192-0.3,288-16
	c96-16.3,192-26.3,240-32l48-5.3V126h-48c-48,0-144,0-240,0s-192,0-288,0s-192,0-288,0s-192,0-288,0s-192,0-240,0H0V158z"
        />
        <rect width="1440" height="129.6" />
      </svg>
    </section>
  );
};

export default AllPage;
