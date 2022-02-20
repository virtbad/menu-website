import { MenuConstructor, MenuPriceConstructor } from "../types/Menu.types";
import { MenuPrice } from "./MenuPrice.class";

export class Menu {
  protected _title: string;

  protected _description: string;

  protected _prices: Array<MenuPrice> = [];

  private _rating: number;

  constructor(ctr: MenuConstructor) {
    this._title = ctr.title;
    this._description = ctr.description;
    this._rating = 10;

    ctr.prices.map((entry: MenuPriceConstructor | MenuPrice) => {
      if (entry instanceof MenuPrice) this._prices.push(entry);
      else this._prices.push(new MenuPrice(entry));
    });
  }

  /**
   * Title of the menu
   */

  public get title(): string {
    return this._title;
  }

  /**
   * Description of the menu
   */

  public get description(): string {
    return this._description;
  }

  /**
   * Prices of the menu
   */

  public get prices(): Array<MenuPrice> {
    return this._prices;
  }


  public get rating(): number {
    return this._rating;
  }
}
