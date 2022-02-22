import { Menu as MuiMenu, MenuItem as MuiMenuItem, MenuItemProps as MuiMenuItemProps, MenuProps as MuiMenuProps } from "@mui/material";
import React from "react";
import style from "../../styles/modules/system/Menu.module.scss";

interface MenuProps extends MuiMenuProps {}

/**
 * Menu component
 */

const Menu: React.FC<MenuProps> = ({ ...props }): JSX.Element => {
  return <MuiMenu classes={{ list: style["menu-list"], paper: style["menu-paper"] }} {...props} />;
};

interface MenuItemProps extends MuiMenuItemProps {
  endIcon?: JSX.Element;
}

/**
 * MenuItem component used in menus, selects and autocompletes
 */

export const MenuItem: React.FC<MenuItemProps> = ({ endIcon, children, ...props }): JSX.Element => {
  return (
    <MuiMenuItem disableRipple classes={{ selected: style["item-selected"], root: style["item-root"] }} {...props}>
      {children}
      {endIcon && <span data-endicon children={endIcon} />}
    </MuiMenuItem>
  );
};

export default Menu;
