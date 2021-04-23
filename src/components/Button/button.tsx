/**
 * Button按钮组件
 * Button Type: primary | default | danger | link 
 * Button Size: normal | small | large
 * Button Status: disabled & linkbutton diabled
 * Demo: <Button size="small" type="primary" disabled className="custom"> Hello Button </Button>
 */
import React from 'react'
import classnames from 'classnames'

// 按钮大小 & 按钮类型
export type ButtonSize = 'lg' | 'sm' | 'normal'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

// 按钮属性
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode
}

// 原生button类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

// 按钮主体
export const Button: React.FC<ButtonProps> = (props) => {
  const { disabled, size, className, btnType, href, children, ...restProps } = props

  const classes = classnames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    'disabled': (btnType === 'link') && href
  })

  if(btnType === 'link' && href) {
    return  (<a className={classes} href={href} {...restProps}>{children}</a>)
  } else {
    return (<button className={classes} disabled={disabled} {...restProps}>{children}</button>)
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button
