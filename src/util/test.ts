import { v4 } from "uuid";
import { Menu } from "../classes/Menu.class";

const menus: Array<object> = [
  {
    title: "Schweinsgeschnetzeltes",
    price: [
      { tag: "SCHU", price: "7.00" },
      { tag: "LEHR", price: "9.50" },
      { tag: "EXT", price: "13.50" },
    ],
    voteBalance: 0,
    description: "Zürcher Art an cremiger Rahmsauce mit Champignons dazu Rösti und Blattspinat",
  },
  {
    title: "Pastetli",
    price: [
      { tag: "SCHU", price: "7.00" },
      { tag: "LEHR", price: "9.50" },
      { tag: "EXT", price: "13.50" },
    ],
    voteBalance: -12,
    description: "Blätterteigpastetli mit Brätkügelifüllung ( Fleisch Kalb, Schwein gemischt ) an weisser Sauce dazu Trockenreis und Erbsli mit Rüebli",
  },
  {
    title: "Rotes Thai Curry",
    price: [
      { tag: "SCHU", price: "7.00" },
      { tag: "LEHR", price: "9.50" },
      { tag: "EXT", price: "13.50" },
    ],
    voteBalance: 149,
    description: "mit Pouletbruststreifen, knackigen Gemüsestreifen an pikantem rotem Curry Jasminreis und Broccolisprosse",
  },
  {
    title: "Tessiner Bratwurstschnecke",
    price: [
      { tag: "SCHU", price: "7.00" },
      { tag: "LEHR", price: "9.50" },
      { tag: "EXT", price: "13.50" },
    ],
    voteBalance: -3,
    description: "an Balsamicojus begleitet von feinen breiten Nudeln dazu unse Italienisches Mischgemüse",
  },
  {
    title: "Pouletschnitzel",
    price: [
      { tag: "SCHU", price: "7.00" },
      { tag: "LEHR", price: "9.50" },
      { tag: "EXT", price: "13.50" },
    ],
    voteBalance: 15,
    description: "paniert, gebacken mit Zitronenscheibe Pommes frites und Buntes Wintermischgemüse",
  },
];

export const randomMenu = (): Menu => {
  const entry: any = menus[Math.floor(Math.random() * (menus.length - 1))];
  return new Menu({ uuid: v4(), title: entry.title, description: entry.description, prices: entry.price, voteBalance: entry.voteBalance, date: new Date() } as any);
};
