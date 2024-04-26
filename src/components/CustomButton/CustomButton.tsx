/* eslint-disable react/button-has-type */
import React, { ReactNode } from 'react';
import { Flex } from '@aws-amplify/ui-react';
import style from './CustomButton.module.css';

interface IProperties extends React.HTMLAttributes<HTMLButtonElement> {
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
