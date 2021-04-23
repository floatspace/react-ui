import React  from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps{
    theme?: ThemeProps
}

export const Icon: React.FC<IconProps> = (props) => {
    const { theme, className, type, ...restProps} = props;
    const classes = classnames('fls-icon', className, {
        [`icon-${theme}`]: theme
    })
    return (<FontAwesomeIcon className={classes} {...restProps}/>)
}
export default Icon