import { FC } from "react";
import Menu, { IMenuProps } from "./menu";
import MenuItem, { IMenuItemProps } from "./menuItem";
import Submenu, { ISubMenuProps } from "./subMenu";

type IMenuComponent = FC<IMenuProps> & {
  Item: FC<IMenuItemProps>;
  SubMenu: FC<ISubMenuProps>;
};
const TransMenu = Menu as IMenuComponent;

TransMenu.Item = MenuItem;
TransMenu.SubMenu = Submenu;

export default TransMenu;
