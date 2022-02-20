import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/SearchPage.module.scss";
import { Autocomplete } from "./system";
import { RatedListItem } from "./system/List";

interface SearchPageProps {
  query?: string;
}

const SearchPage: React.FC<SearchPageProps> = ({ query = "" }): JSX.Element => {
  const [filter, setFilter] = useState<string>(query);
  const searchbarRef = useRef<HTMLDivElement>(null);
  const { getMenuResults, data } = useSearchbar();

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

  useEffect(() => {
    if (!data.results) getMenuResults(query).catch(() => {});
  }, []);

  console.log(searchbarRef);

  return (
    <>
      <TopWave />
      <section className={style["searchpage-container"]}>
        <div className={style["searchpage-content"]}>
          <h1 children={"Menüsuche"} />
          <div ref={searchbarRef} className={style["searchpage-searchbar"]}>
            <Autocomplete
              disablePopper
              themedBackground
              fullWidth
              value={query}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(event?.target?.value || "")}
              onAutocomplete={(_, value) => setFilter(value || "")}
              options={data.results.map(({ title }) => title)}
              label={"Menü suchen"}
            />
          </div>
          <div className={style["searchpage-menus"]}>
            {data.results.map((menu: Menu) => {
              if (menu.title.toLowerCase().includes(filter.toLowerCase())) return <RatedListItem key={menu.uuid} menu={menu} />;
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
