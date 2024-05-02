import React, {
  DetailedHTMLProps,
  ReactNode,
  SelectHTMLAttributes,
} from 'react';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import style from './DropdownMenu.module.css';

interface IProperties
  extends DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  variation?: 'small' | 'regular';
}

const CustomSelect = ({
  variation = 'regular',
  children,
  className,
  ...otherProps
}: IProperties) => (
  <div className={`${style.customSelect}`}>
    <select
      className={`${style.select} ${
        variation === 'regular' ? style.regular : ''
      } ${className}`}
      {...otherProps}
    >
      {children}
    </select>
    <MdOutlineArrowDropDown className={`${style.icon}`} />
  </div>
);

export default CustomSelect;
