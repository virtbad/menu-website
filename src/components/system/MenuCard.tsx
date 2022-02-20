import React, { useState } from "react";
import useSWR from "swr";
import { Menu } from "../../classes/Menu.class";
import { MenuPrice } from "../../classes/MenuPrice.class";
import style from "../../styles/modules/system/MenuCard.module.scss";
import { randomMenu } from "../../util/test";
import Vote from "./Vote";

interface MenuCardProps {
  variant?: "small" | "big";
  uuid: string;
  stickOut?: boolean;
}

/**
 * Card component to display menu information
 */

const MenuCard: React.FC<MenuCardProps> = ({ stickOut = false, variant = "big" }): JSX.Element => {
  const {} = useSWR(false && ""); //fetch menu for card

  const [menu] = useState<Menu>(randomMenu());

  return (
    <section className={style["card-container"]} data-variant={variant}>
      <div className={style["title"]}>
        <h2 children={menu.title} />
        {/* <span className={style["vote-container"]}>
          <ArrowDropUpSharpIcon />
          <h2 children={10} />
          <ArrowDropDownSharpIcon />
        </span> */}
        <Vote votes={10} />
      </div>
      <div className={style["description"]}>
        <div children={menu.description} />
      </div>
      <div className={style["prices-container"]}>
        {menu.prices.map((price: MenuPrice) => {
          return <Price price={price} key={price.group + price.priceString} />;
        })}
      </div>

      {stickOut && <div className={style["card-border-top"]} />}
      {stickOut && <div className={style["card-border-left"]} />}
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
