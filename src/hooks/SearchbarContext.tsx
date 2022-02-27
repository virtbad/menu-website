import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import { createContext, useContext, useState } from "react";
import { Logger } from "../classes/Logger.class";
import { Menu } from "../classes/Menu.class";
import { MenuConstructor, MenuLabel } from "../types/Menu.types";
import { apiUrl } from "../util/global.config";
import { convertAxiosErrorString } from "../util/util";

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
  getMenuResults: (query: string, options?: SearchOptions) => Promise<Array<Menu>>;
  getAllMenuResults: (page?: number) => Promise<Array<Menu>>;
  headerSearchbar: boolean;
  setHeaderSearchbar: (show: boolean) => void;
}

const defaultValues: SearchbarContext = {
  getMenuResults: () => new Promise(() => {}),
  getAllMenuResults: () => new Promise(() => {}),
  headerSearchbar: false,
  setHeaderSearchbar: () => {},
};

export const SearchbarContext = createContext<SearchbarContext>(defaultValues);

/**
 * Provider for the searchbar context to manage multiple searchbars
 */

export const SearchbarProvider: NextPage = ({ children }): JSX.Element => {
  const [headerSearchbar, setHeaderSearchbar] = useState<boolean>(false);
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
      Logger.request(`Fetching menus with query "${query}"`);
      const results: AxiosResponse<Array<MenuConstructor>> = await axios.get(searchQuery);
      const mapped = (results?.data || []).map((ctr: MenuConstructor) => new Menu(ctr));
      return mapped;
    } catch (e: any) {
      Logger.error(`Query menus: ${convertAxiosErrorString(e)}`);
      return [];
    }
  };

  /**
   * Get all menus
   *
   * @param page page of the menus
   *
   * @returns array with menus
   */

  const getAllMenuResults = async (page: number = 0): Promise<Array<Menu>> => {
    try {
      let allQuery = `${apiUrl}/menu/all`;
      if (page !== 0) allQuery += `?page=${page}`;
      Logger.request(`Fetching all menus at page ${page}`);
      const results: AxiosResponse<Array<MenuConstructor>> = await axios.get(allQuery);
      const mapped = (results?.data || []).map((ctr: MenuConstructor) => new Menu(ctr));
      return mapped;
    } catch (e: any) {
      Logger.error(`Fetch all menus: ${convertAxiosErrorString(e)}`);
      return [];
    }
  };

  return <SearchbarContext.Provider value={{ getMenuResults: getMenuResults, getAllMenuResults: getAllMenuResults, headerSearchbar: headerSearchbar, setHeaderSearchbar: setHeaderSearchbar }} children={children} />;
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
