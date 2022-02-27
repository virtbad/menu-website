import Link from "next/link";
import React from "react";
import { Button } from ".";
import { Menu } from "../../classes/Menu.class";
import { MenuPrice } from "../../classes/MenuPrice.class";
import style from "../../styles/modules/system/MenuCard.module.scss";
import { MenuLabel } from "../../types/Menu.types";
import { VerticalVote } from "./Vote";

interface MenuCardProps {
  menu: Menu;
  more?: boolean;
  background?: boolean;
  href?: string;
  disabled?: boolean;
}

/**
 * Card component to display menu information
 */

const MenuCard: React.FC<MenuCardProps> = ({ menu, more = true, background = true, href, disabled = false }): JSX.Element => {
  const BaseCard: JSX.Element = (
    <section className={style["card-container"]} data-background={background} data-label={menu.label !== MenuLabel.NO_LABEL && menu.label !== undefined}>
      <div className={style["card-vote"]} children={<VerticalVote disabled={disabled} menuId={menu.uuid} theme={"dark"} votes={menu.votes} />} />
      <div className={style["card-title"]}>
        <h3 children={menu.title} />
        {menu.label !== MenuLabel.NO_LABEL && <code children={menu.parsedLabel} className={style["card-label"]} />}
      </div>
      <div className={style["card-date"]} children={menu.date.toLocaleDateString("de", { month: "2-digit", day: "2-digit", year: "numeric" })} />
      <div className={style["card-description"]} children={menu.description} />
      <div className={style["card-prices-container"]}>
        {menu.prices.map((price: MenuPrice) => {
          return <Price price={price} key={price.group + price.priceString} />;
        })}
      </div>
      {more && (
        <div className={style["card-buttons"]}>
          <Button theme={"green"} forwardIcon children={"Mehr"} href={`/menu/${menu.uuid}`} />
        </div>
      )}
    </section>
  );

  if (href) return <Link href={href} children={BaseCard} />;
  else return BaseCard;
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
