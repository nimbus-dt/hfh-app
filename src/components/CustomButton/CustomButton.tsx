/* eslint-disable react/button-has-type */
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from 'react';
import style from './CustomButton.module.css';

interface IProperties
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: ReactNode;
  variation?: 'primary' | 'secondary' | 'text-only';
}

const CustomButton = ({
  children,
  icon,
  variation = 'primary',
  className,
  ...otherProps
}: IProperties) => (
  <button
    className={`${style.button} ${style[variation]} theme-button ${className}`}
    {...otherProps}
  >
    <div className={style.container}>
      <div>{children}</div>
      {icon && <div className={style.icon}>{icon}</div>}
    </div>
  </button>
);

export default CustomButton;
