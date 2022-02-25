import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/Header.module.scss";
import { searchDebounceDelay } from "../util/global.config";
import QuickProfile from "./QuickProfile";
import { Autocomplete } from "./system";

interface HeaderProps {
  hideSearchbar?: boolean | "scroll-in";
}

/**
 * Header component
 */

const Header: React.FC<HeaderProps> = ({ hideSearchbar = false }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = (event: Event) => {
      setVisible(window.scrollY > 200);
      const newOpacity: number = window.scrollY / 250;
      document.documentElement.style.setProperty("--header-opacity", (newOpacity > 1 ? 1 : newOpacity).toFixed(2));
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      return window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={style["header-container"]} data-background={visible}>
      <div children={<></>} />
      {(hideSearchbar === "scroll-in" && visible) || !hideSearchbar ? <Searchbar /> : <span />}
      <div children={<QuickProfile />} />
    </header>
  );
};

/**
 * Header search bar component
 */

const Searchbar: React.FC = (): JSX.Element => {
  let mounted: boolean = true;
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { getMenuResults } = useSearchbar();
  const [results, setResults] = useState<Array<Menu>>([]);

  useEffect(() => {
    mounted = true;
    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    getMenuResults(event.target.value)
      .then((menus: Array<Menu>) => mounted && setResults(menus))
      .catch();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;
    router.push(`/search?query=${ref?.current?.getAttribute("data-text")}`);
  };

  return (
    <Autocomplete
      ref={ref}
      onAutocomplete={(event: any, value: string, reason: string) => {
        if (reason === "input") ref.current?.setAttribute("data-text", event.target.value);
        else router.push(`/search?query=${value}`);
      }}
      themedBackground
      onKeyPress={handleKeyPress}
      onChange={debounce(handleChange, searchDebounceDelay)}
      placeholder={"Menü suchen"}
      options={results.map(({ title }) => title)}
    />
  );
};

export default Header;
