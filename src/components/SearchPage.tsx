import React, { useEffect, useState } from "react";
import { Menu } from "../classes/Menu.class";
import style from "../styles/modules/SearchPage.module.scss";
import { randomMenu } from "../util/test";
import { Autocomplete } from "./system";
import { RatedListItem } from "./system/List";

const SearchPage: React.FC = (): JSX.Element => {
  const [results, setResults] = useState<Array<Menu>>([]);
  const [filter, setFilter] = useState<string>("");

  const fetchResults = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      if (results.length < 50) setResults([...results, randomMenu()]);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <section className={style["searchpage-container"]}>
      <div className={style["searchpage-content"]}>
        <div className={style["searchpage-searchbar"]}>
          <Autocomplete fullWidth onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFilter(event?.target?.value || "")} options={results.map(({ title }) => title)} label={"Menü suchen"} />
        </div>
        <div className={style["searchpage-menus"]}>
          {results.map((menu: Menu, index: number) => {
            if (menu.title.toLowerCase().includes(filter.toLowerCase())) return <RatedListItem key={index} score={index + 1} title={menu.title} votes={Math.floor(Math.random() * 10)} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
