import React from "react";
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
  return <div className={style["listitem-container"]}>
    
  </div>;
};

export default List;
