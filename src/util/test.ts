import { Menu } from "../classes/Menu.class";

const menus: Array<object> = [
  {
    title: "Schweinsgeschnetzeltes",
    price: [
      { group: "SCHU", price: "7.00" },
      { group: "LEHR", price: "9.50" },
      { group: "EXT", price: "13.50" },
    ],
    description: "Zürcher Art an cremiger Rahmsauce mit Champignons dazu Rösti und Blattspinat",
  },
  {
    title: "Pastetli",
    price: [
      { group: "SCHU", price: "7.00" },
      { group: "LEHR", price: "9.50" },
      { group: "EXT", price: "13.50" },
    ],
    description: "Blätterteigpastetli mit Brätkügelifüllung ( Fleisch Kalb, Schwein gemischt ) an weisser Sauce dazu Trockenreis und Erbsli mit Rüebli",
  },
  {
    title: "Rotes Thai Curry",
    price: [
      { group: "SCHU", price: "7.00" },
      { group: "LEHR", price: "9.50" },
      { group: "EXT", price: "13.50" },
    ],
    description: "mit Pouletbruststreifen, knackigen Gemüsestreifen an pikantem rotem Curry Jasminreis und Broccolisprosse",
  },
  {
    title: "Tessiner Bratwurstschnecke",
    price: [
      { group: "SCHU", price: "7.00" },
      { group: "LEHR", price: "9.50" },
      { group: "EXT", price: "13.50" },
    ],
    description: "an Balsamicojus begleitet von feinen breiten Nudeln dazu unse Italienisches Mischgemüse",
  },
  {
    title: "Pouletschnitzel",
    price: [
      { group: "SCHU", price: "7.00" },
      { group: "LEHR", price: "9.50" },
      { group: "EXT", price: "13.50" },
    ],
    description: "paniert, gebacken mit Zitronenscheibe Pommes frites und Buntes Wintermischgemüse",
  },
];

export const randomMenu = (): Menu => {
  const entry: any = menus[Math.floor(Math.random() * (menus.length - 1))];
  return new Menu({ title: entry.title, description: entry.description, prices: entry.price });
};
