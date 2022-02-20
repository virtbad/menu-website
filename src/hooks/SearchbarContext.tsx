import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { Logger } from "../classes/Logger.class";
import { Menu } from "../classes/Menu.class";
import { MenuConstructor, MenuLabel } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";

interface SearchOptions {
  /**
   * Page of the menu
   */

  page?: number;

  /**
   * Only return menus with a given channel
   */

  channel?: number;

  /**
   * Only return menus with a given label
   */

  label?: MenuLabel;

  /**
   * Only return menus which were after this timestamp
   */

  start?: number;

  /**
   * Only return menus which were before this timestamp
   */

  end?: number;
}

interface SearchbarContext {
  getMenuResults: (query: string) => Promise<Array<Menu>>;
  clearData: () => void;
  data: { query: string; results: Array<Menu> };
}

const defaultValues: SearchbarContext = {
  getMenuResults: () => new Promise(() => {}),
  clearData: () => {},
  data: { query: "", results: [] },
};

export const SearchbarContext = createContext<SearchbarContext>(defaultValues);

/**
 * Provider for the searchbar context to manage multiple searchbars
 */

export const SearchbarProvider: NextPage = ({ children }): JSX.Element => {
  const router = useRouter();
  const [data, setData] = useState<{ query: string; results: Array<Menu> }>(defaultValues.data);

  useEffect(() => {
    let mounted: boolean = true;
    getMenuResults("bu")
      .then((menus: Array<Menu>) => mounted && setData({ query: "", results: menus }))
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  /**
   * Get the menus for a search query
   *
   * @param text search query
   */

  const getMenuResults = async (query: string, options: SearchOptions = {}): Promise<Array<Menu>> => {
    try {
      let searchQuery = `${apiUrl}/menu/search?query=${query}`;
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) searchQuery += `&${key}=${value}`;
      });
      const results: AxiosResponse<Array<MenuConstructor>> = await axios.get(searchQuery);
      const mapped = (results?.data || []).map((ctr: MenuConstructor) => new Menu(ctr));
      setData({ query: query, results: mapped });
      return mapped;
    } catch (e: any) {
      Logger.error(`Fetch menus: ${e?.message || "Unknown message"}\n${e?.response?.data?.message || "No error message"}`);
      return [];
    }
  };

  /**
   * Clear data
   */

  const clearData = (): void => {
    if (defaultValues.data.query !== data.query) setData(defaultValues.data);
  };

  return <SearchbarContext.Provider value={{ getMenuResults: getMenuResults, clearData: clearData, data: data }} children={children} />;
};

/**
 * Access the searchbar values
 */

export const useSearchbar = (): SearchbarContext => {
  const context = useContext(SearchbarContext);

  if (context === undefined) {
    throw new Error("useSearchbar must be used within a SearchbarProvider");
  }

  return context;
};
