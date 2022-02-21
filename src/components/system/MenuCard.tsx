import React from "react";
import { Menu } from "../../classes/Menu.class";
import { MenuPrice } from "../../classes/MenuPrice.class";
import style from "../../styles/modules/system/MenuCard.module.scss";
import { VerticalVote } from "./Vote";

interface MenuCardProps {
  menu: Menu;
  loading?: boolean;
}

/**
 * Card component to display menu information
 */

const MenuCard: React.FC<MenuCardProps> = ({ menu, loading = false }): JSX.Element => {
  return (
    <section className={style["card-container"]}>
      <div className={style["card-vote"]} children={<VerticalVote votes={Math.floor(Math.random() * 100)} />} />
      <div className={style["card-title"]} children={<h2 children={menu.title} />} />
      <div className={style["card-description"]} children={menu.description} />
      <div className={style["card-prices-container"]}>
        {menu.prices.map((price: MenuPrice) => {
          return <Price price={price} key={price.group + price.priceString} />;
        })}
      </div>
    </section>
  );
};

interface PriceProps {
  price: MenuPrice;
}

/**
 * Menu price component
 */

const Price: React.FC<PriceProps> = ({ price }): JSX.Element => {
  return (
    <div className={style["price-container"]}>
      <span className={style["price-group"]} children={price.group} />
      <span className={style["price-price"]} children={price.priceString} />
    </div>
  );
};

export default MenuCard;
