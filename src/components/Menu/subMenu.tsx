/**
 * SubMenu下拉菜单组件
 * 属性: index, title-必填, className
 * 使用：<SubMenu title="下拉菜单"/>
 */
import  React, {useContext, useState, FunctionComponentElement} from 'react';
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames';
import { MenuContext } from './menu';
import { IMenuItemProps } from './menuItem';
import Icon from '../Icon/icon'

export interface ISubMenuProps {
  index?: string;
  title: string;
  className?: string
}

export const SubMenu: React.FC<ISubMenuProps> = ({index, title, className, children}) => {
  const context = useContext(MenuContext);

  const openSubMenus = context.defaultOpenIndex as Array<string>;
  const isOpend = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;

  const [showSubmenu, setSubmenu] = useState(isOpend)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': index === context.index,
    'menu-opened': showSubmenu,
    'is-vertical': context.mode === 'vertical'
  });

  // 子组件
  const renderChildren = () => {
    const childComponet =  React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<IMenuItemProps>;
      if(childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {index: `${index}-${i.toString()}`});
      } else {
        console.error('Warning: SubMenu组件中含有非MenuItem子组件');
      }
    })
    const classes = classNames('submenu', {
      'is-active': context.index === index,
    })
    return (
      <CSSTransition in={showSubmenu} timeout={300} classNames="zoom-in-top" appear unmountOnExit>
        <ul className={classes}>{childComponet}</ul>
      </CSSTransition>
    );
  };

  // 事件
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setSubmenu(!showSubmenu)
  }

  let timer: any = null
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setSubmenu(toggle)   
    }, 300);
  }

  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => handleMouse(e, true),
    onMouseLeave: (e: React.MouseEvent) => handleMouse(e, false)
  } : {};

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon='angle-down' theme="dark" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
}

SubMenu.displayName = 'SubMenu';

export default SubMenu;