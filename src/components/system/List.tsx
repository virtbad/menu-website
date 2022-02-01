import React from "react";
import { Button } from ".";
import style from "../../styles/modules/system/List.module.scss";

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
  /**
   * Score of the rated menu
   */

  score: number;

  /**
   * Title of the menu
   */

  title: string;

  /**
   * Votes of the menu
   */

  votes: number;

  /**
   * Href to the menu
   */

  href?: string;
}

export const RatedListItem: React.FC<RatedListItemProps> = ({ score, title, votes, href }): JSX.Element => {
  return (
    <div className={style["listitem-container"]} data-rated={true}>
      <h3 className={style["item-score"]} children={`${score}.`} />
      <div className={style["item-title"]} children={title} />
      <Button className={style["item-button"]} children={"Mehr"} href={href} />
    </div>
  );
};

export default List;
