import { MenuPrice } from "../classes/MenuPrice.class";

export interface MenuConstructor {
  /**
   * Title of the menu
   */

  title: string;

  /**
   * Description of the menu
   */

  description: string;

  /**
   * Different prices for the menu
   */

  prices: Array<MenuPrice | MenuPriceConstructor>;
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

  group: string;

  /**
   * Price for the price group
   */

  price: number;
}
