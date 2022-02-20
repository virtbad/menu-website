import { MenuPrice } from "../classes/MenuPrice.class";

export interface MenuConstructor {
  /**
   * Uuid of the menu
   */

  uuid: string;

  /**
   * Title of the menu
   */

  title: string;

  /**
   * Description of the menu
   */

  description: string;

  /**
   * Unix timestamp of the date
   */

  date: number;

  /**
   * Menu channel
   */

  channel: number;

  /**
   * Label of the menu
   */

  label: MenuLabel;

  /**
   * Different prices for the menu
   */

  prices: Array<MenuPrice | MenuPriceConstructor>;

  /**
   * Votes of the menu
   */

  voteBalance: number;
}

/**
 * Constructor interface for the menu class
 */

/**
 * Constructor interface for the menu price class
 */

export interface MenuPriceConstructor {
  /**
   * Group of the menu price
   */

  tag: string;

  /**
   * Price for the price group
   */

  price: number;
}

export enum MenuLabel {
  NO_LABEL = 0,
  VEGETARIAN = 1,
  VEGAN = 2,
  ONE_CLIMATE = 3,
}
