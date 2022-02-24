import { Menu as MuiMenu, MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps, MenuProps as MuiMenuProps } from "@mui/material";
import React from "react";
import style from "../../styles/modules/system/Menu.module.scss";

interface MenuProps extends MuiMenuProps {}

/**
 * Menu component
 */

const Menu: React.FC<MenuProps> = ({ ...props }): JSX.Element => {
  return <MuiMenu disableRestoreFocus classes={{ list: style["menu-list"], paper: style["menu-paper"] }} {...props} />;
};

interface MenuItemProps extends MuiMenuItemProps {
  endIcon?: JSX.Element;
}

/**
 * MenuItem component used in menus, selects and autocompletes
 */

export const MenuItem: React.FC<MenuItemProps> = ({ endIcon, children, ...props }): JSX.Element => {
  if (false) return <MuiMenuItem children={children} />;
  return (
    /*  <MuiMenuItem unselectable={"on"} disableRipple disableTouchRipple classes={{ selected: style["item-selected"], root: style["item-root"] }} {...props}>
      {children}
      {endIcon && <span data-endicon children={endIcon} />}
    </MuiMenuItem> */
    <div className={style["item-root"]} {...(props as any)}>
      {children}
      {endIcon && <span data-endicon children={endIcon} />}
    </div>
  );
};

export default Menu;
