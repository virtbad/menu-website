import React from "react";
import useSWR from "swr";
import style from "../../styles/modules/system/MenuCard.module.scss";

interface MenuCardProps {
  variant?: "small" | "big";
  uuid: string;
}

/**
 * Card component to display menu information
 */

const MenuCard: React.FC<MenuCardProps> = ({ variant = "big" }): JSX.Element => {
  const {} = useSWR(false && ""); //fetch menu for card

  return <section className={style["card-container"]} data-variant={variant}></section>;
};

export default MenuCard;
