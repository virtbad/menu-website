import { MenuPriceConstructor } from "../types/Menu.types";

export class MenuPrice {
  protected _group: string;
  protected _price: number;

  constructor(ctr: MenuPriceConstructor) {
    this._group = ctr.group;
    this._price = parseFloat(ctr.price.toString());
  }

  /**
   * Group of the menu price
   */

  public get group(): string {
    return this._group;
  }

  /**
   * Price for the menu group
   */

  public get price(): number {
    return this._price;
  }

  /**
   * Price for the menu as prepared string
   */

  public get priceString(): string {
    return this._price.toFixed(2);
  }
}
