import React from "react";
import { Button } from ".";
import { Menu } from "../../classes/Menu.class";
import style from "../../styles/modules/system/List.module.scss";
import Vote, { VerticalVote } from "./Vote";

interface ListProps {}

/**
 * List component
 */

const List: React.FC<ListProps> = (): JSX.Element => {
  return <div className={style["list-container"]}></div>;
};

interface ListItemProps {}

/**
 * List item component
 */

export const ListItem: React.FC<ListItemProps> = (): JSX.Element => {
  return <div className={style["listitem-container"]}></div>;
};

interface RatedListItemProps {
  menu: Menu;
}

export const RatedListItem: React.FC<RatedListItemProps> = ({ menu }): JSX.Element => {
  return (
    <div className={style["listitem-container"]} data-rated={true}>
      <h3 className={style["item-title"]} children={menu.title} />
      <div className={style["item-description"]} children={menu.description} />
      <div className={style["item-vote"]} children={<VerticalVote votes={menu.votes} />} />
      <div className={style["item-button"]} children={<Button forwardIcon theme={"green"} children={"Mehr"} href={`/menu/${menu.uuid}`} />} />
      <div className={style["item-date"]} children={menu.date.toLocaleDateString("de", { month: "2-digit", day: "2-digit", year: "2-digit" })} />
    </div>
  );
};

export default List;
