import { MenuPriceConstructor } from "../types/Menu.types";

export class MenuPrice {
  /**
   * Group of the menu price
   */

  public readonly group: string;

  /**
   * Price for the menu group
   */

  public readonly price: number;

  constructor(ctr: MenuPriceConstructor) {
    this.group = ctr.tag;
    this.price = parseFloat(ctr.price.toString());
  }

  /**
   * Price for the menu as prepared string
   */

  public get priceString(): string {
    return this.price.toFixed(2);
  }
}
