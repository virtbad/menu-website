import { debounce } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "../classes/Menu.class";
import { useSearchbar } from "../hooks/SearchbarContext";
import style from "../styles/modules/Header.module.scss";
import QuickProfile from "./QuickProfile";
import { Autocomplete } from "./system";

interface HeaderProps {
  hideSearchbar?: boolean;
}

/**
 * Header component
 */

const Header: React.FC<HeaderProps> = ({ hideSearchbar = false }): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const scrollHandler = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      return window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className={style["header-container"]} data-background={visible}>
      <div children={/* <Avatar size="small" /> */ <></>} />
      {!hideSearchbar ? <Searchbar /> : <span />}
      <div children={<QuickProfile />} />
    </header>
  );
};

const Searchbar: React.FC = (): JSX.Element => {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const { getMenuResults, data } = useSearchbar();
  const [results, setResults] = useState<Array<Menu>>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    getMenuResults(event.target.value).then(setResults).catch();
  };

  console.log(
    results,
    results.map(({ title }) => title)
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Enter") return;
    router.push(`/search?query=${ref?.current?.getAttribute("data-text")}`);
  };

  return (
    <Autocomplete
      ref={ref}
      onAutocomplete={(event: any, value: string, reason) => {
        if (reason === "input") ref.current?.setAttribute("data-text", event.target.value);
        else router.push(`/search?query=${value}`);
      }}
      themedBackground
      onKeyPress={handleKeyPress}
      onChange={debounce(handleChange, 250)}
      placeholder={"Menü suchen"}
      options={results.map(({ title }) => title)}
    />
  );
};

export default Header;
