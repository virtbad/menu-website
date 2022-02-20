import { MenuConstructor, MenuLabel, MenuPriceConstructor } from "../types/Menu.types";
import { MenuPrice } from "./MenuPrice.class";

export class Menu {
  /**
   * Uuid of the menu
   */

  public readonly uuid: string;

  /**
   * Title of the menu
   */

  public readonly title: string;

  /**
   * Description of the menu
   */

  public readonly description: string;

  /**
   * Date of the menu
   */

  public readonly date: Date;

  /**
   * Channel of the menu
   */

  public readonly channel: number;

  /**
   * Label of the menu
   */

  public readonly label: MenuLabel;

  /**
   * Prices of the menu
   */

  public readonly prices: Array<MenuPrice> = [];

  /**
   * Votes of the menu
   */

  public readonly votes: number;

  constructor(ctr: MenuConstructor) {
    this.uuid = ctr.uuid || (ctr as any).id;
    this.title = ctr.title;
    this.description = ctr.description;
    this.date = new Date(ctr.date);
    this.channel = ctr.channel;
    this.label = ctr.label;

    ctr.prices.forEach((entry: MenuPriceConstructor | MenuPrice) => {
      if (entry instanceof MenuPrice) this.prices.push(entry);
      else this.prices.push(new MenuPrice(entry));
    });

    this.votes = ctr.voteBalance;
  }
}
