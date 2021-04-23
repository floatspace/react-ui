/**
 * Menu菜单
 * 使用:
 * <Menu active="2" mode="vertical">
 *   <MenuItem>首页</MenuItem>
 * </Menu>
 */
import React, {
  useState,
  createContext,
  cloneElement,
  FunctionComponentElement,
} from "react";
import classNames from "classnames";
import { IMenuItemProps } from "./menuItem";
import { ISubMenuProps } from "./subMenu";

type MenuMode = "horizental" | "vertical";
type OnSelectType = (selectedIndex: string) => void;

export interface IMenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: OnSelectType;
  defaultOpenIndex?: string[];
}

export interface IMenuContext {
  index: string;
  mode?: MenuMode;
  onSelect?: OnSelectType;
  defaultOpenIndex?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

export const Menu: React.FC<IMenuProps> = (props) => {
  const {
    defaultIndex,
    mode,
    className,
    style,
    onSelect,
    defaultOpenIndex,
    children,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizental": mode !== "vertical",
  });

  // child校验
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // console.log('index', index);
      const childElement = child as FunctionComponentElement<
        IMenuItemProps | ISubMenuProps
      >;
      // 获取子组件的diaplayName，然后做判断
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        // 子组件中添加自定义内容：index
        return cloneElement(childElement, { index: index.toString() });
      } else {
        console.error("Warning: Menu组件中含有非MenuItem子组件");
      }
    });
  };
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    mode,
    onSelect: handleClick,
    defaultOpenIndex,
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizental",
  defaultOpenIndex: [],
};

export default Menu;
