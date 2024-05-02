/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import style from './IconButton.module.css';

interface IProperties
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variation?: 'outlined' | 'not-outlined';
}

const IconButton = ({
  variation = 'outlined',
  children,
  className,
  ...buttonProps
}: IProperties) => (
  <button
    className={`${style.button} ${style[variation]} ${className}`}
    {...buttonProps}
  >
    {children}
  </button>
);

export default IconButton;
