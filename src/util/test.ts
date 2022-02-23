import { v4 } from "uuid";
import { Comment } from "../classes/Comment.class";
import { Menu } from "../classes/Menu.class";
import { User } from "../classes/User.class";

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

const users: Array<{ firstname: string; lastname: string; tag: string }> = [
  { firstname: "Ronnie", lastname: "Hall", tag: "ronnie_hall@test.ch" },
  { firstname: "Benjamin", lastname: "Ramos", tag: "benjamin_ramos@test.ch" },
  { firstname: "Lorena", lastname: "Jackson", tag: "lorena_jackson@test.ch" },
];

export const randomMenu = (): Menu => {
  const entry: any = menus[Math.floor(Math.random() * (menus.length - 1))];
  return new Menu({ uuid: v4(), title: entry.title, description: entry.description, prices: entry.price, voteBalance: entry.voteBalance, date: new Date() } as any);
};

export const randomComment = (): Comment => {
  return new Comment({ title: "Esch geil gsi", content: "Das Menü hatte noch kleine Würfel drin", rating: 3.5, created: new Date(), edited: false, id: v4(), user: randomUser() });
};

export const randomUser = (): User => {
  const entry: any = users[Math.floor(Math.random() * (users.length - 1))];
  return new User({ admin: true, banned: false, firstname: entry.firstname, lastname: entry.lastname, joined: new Date(), tag: entry.tag });
};
