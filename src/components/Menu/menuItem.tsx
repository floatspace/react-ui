/**
 * MenuItem组件
 * 可选属性：index, disabled, className, style
 * 使用: <MenuItem>子菜单</MenuItem>
 */
import React, {useContext} from 'react'
import classnames from 'classnames'
import {MenuContext} from './menu'

export interface IMenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<IMenuItemProps> = (props) => {
  const {index, disabled, className, style, children} = props
  const context = useContext(MenuContext)

  const classes = classnames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': index === context.index
  })

  const handleClick = () => {
    if(context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index)
    }
  }
  return (<li className={classes} style={style} onClick={handleClick}>{children}</li>)
}

MenuItem.displayName = 'MenuItem'

export default MenuItem