import { debounce } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/SearchPage.module.scss";
import { searchDebounceDelay } from "../util/global.config";
import { Autocomplete } from "./system";
import { RatedListItem } from "./system/List";

interface SearchPageProps {
  query?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ query = "" }): JSX.Element => {
  let mounted: boolean = true;
  const [results, setResults] = useState<{ query: string; results: Array<Menu> }>({ query: "", results: [] });
  const ref = useRef<HTMLInputElement>(null);
  const { getMenuResults } = useSearchbar();

  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(([entry]: Array<IntersectionObserverEntry>) => {
      console.log(entry.isIntersecting);
    });
    observer.observe(ref.current as any);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    mounted = true;
    getMenuResults(query)
      .then((menus: Array<Menu>) => mounted && setResults({ query: query, results: menus }))
      .catch();
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    getMenuResults(event.target.value)
      .then((menus: Array<Menu>) => mounted && setResults({ query: event.target.value, results: menus }))
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
              options={results.results.map(({ title }) => title)}
              label={"Menü suchen"}
              placeholder={"Suchbegriff eingeben"}
            />
          </div>
          <div className={style["searchpage-menus"]}>
            {results.results.map((menu: Menu) => {
              return <RatedListItem href={`/menu/${menu.uuid}`} key={menu.uuid} menu={menu} />;
            })}
            {results.results.length === 0 && results.query !== "" && results.query.length !== 1 && <span className={style["noresult"]} children={"Keine Ergebnisse gefunden"} />}
            {results.results.length === 0 && results.query === "" && <span className={style["noresult"]} children={"Gib einen Suchbegriff ein"} />}
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
