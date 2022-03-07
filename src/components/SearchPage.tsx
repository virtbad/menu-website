import { debounce } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/SearchPage.module.scss";
import { searchDebounceDelay } from "../util/global.config";
import { Autocomplete } from "./system";
import { RatedListItem } from "./system/List";
import Loader from "./system/Loader";

interface SearchPageProps {
  query?: string;
}

/**
 * Search page component
 */

const SearchPage: React.FC<SearchPageProps> = ({ query = "" }): JSX.Element => {
  let mounted: boolean = true;
  const [results, setResults] = useState<{ query: string; results: Array<Menu>; page: number }>({ query: "", results: [], page: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [last, setLast] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const loaderRef = useRef<HTMLSpanElement>(null);
  const { getMenuResults, setHeaderSearchbar } = useSearchbar();
  const [visible, setVisible] = useState<boolean>(false);
  const [inScreen, setInScreen] = useState<boolean>(true);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    setHeaderSearchbar({ visible: !inScreen, query: results.query });
  }, [inScreen]);

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(([entry]: Array<IntersectionObserverEntry>) => setInScreen(entry.isIntersecting));
    observer.observe(ref.current as any);
    return () => {
      observer.disconnect();
    };
  }, []);

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

  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  }, []);

  const moreMenus = () => {
    if (loading || !results.query || last) return;
    setLoading(true);
    getMenuResults(results.query, { page: results.page })
      .then((menus: Array<Menu>) => {
        if (!mounted) return;
        if (menus.length === 0) setLast(true);
        setResults({ query: results.query, results: [...results.results, ...menus], page: results.page + 1 });
        setLoading(false);
      })
      .catch();
  };

  useEffect(() => {
    if ((!query && !cookies.query) || loading) return;
    setLoading(true);
    getMenuResults(query || cookies.query)
      .then((menus: Array<Menu>) => {
        if (!mounted) return;
        setResults({ query: query, results: menus, page: 0 });
      })
      .catch()
      .finally(() => setLoading(false));
  }, [query]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleChange(event as any);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (results.query === event.target.value) return;
    getMenuResults(event.target.value)
      .then((menus: Array<Menu>) => {
        if (!mounted) return;
        setResults({ query: event.target.value, results: menus, page: 0 });
        setLast(false);
      })
      .catch();
  };

  return (
    <>
      <TopWave />
      <section className={style["searchpage-container"]}>
        <div className={style["searchpage-content"]}>
          <h1 children={"Menüsuche"} />
          <div className={style["searchpage-searchbar"]}>
            <Autocomplete
              ref={ref}
              disablePopper
              themedBackground
              fullWidth
              value={query}
              onChange={debounce(handleChange, searchDebounceDelay)}
              onAutocomplete={(event: any, _: string, reason: string) => {
                if (reason === "input") ref.current?.setAttribute("data-text", event.target.value);
              }}
              onKeyPress={debounce(handleKeyPress, searchDebounceDelay)}
              options={results.results.map(({ title }) => title)}
              label={"Menü suchen"}
              placeholder={"Suchbegriff eingeben"}
            />
          </div>
          <div className={style["searchpage-menus"]}>
            {results.results
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((menu: Menu, index: number) => {
                const handleClick = () => setCookie("query", results.query || query || "");
                return <RatedListItem onClick={handleClick} disabled href={`/menu/${menu.uuid}`} key={`${index}-${menu.uuid}`} menu={menu} />;
              })}
            {results.results.length === 0 && results.query !== "" && results.query.length !== 1 && <span className={style["noresult"]} children={"Keine Ergebnisse gefunden"} />}
            {results.results.length === 0 && results.query === "" && <span className={style["noresult"]} children={"Gib einen Suchbegriff ein"} />}
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
          d="M0,252l60-11.4c60-10.9,180-34.3,300-17c120,16.7,240,74,360,90.7c120,17.3,240-6.1,360-34c120-28.4,240-62.4,300-79.4
	l60-17v-34h-60c-60,0-180,0-300,0s-240,0-360,0s-240,0-360,0s-240,0-300,0H0V252z"
        />
        <rect width="1440" height="150" />
      </svg>
    </section>
  );
};

export default SearchPage;
