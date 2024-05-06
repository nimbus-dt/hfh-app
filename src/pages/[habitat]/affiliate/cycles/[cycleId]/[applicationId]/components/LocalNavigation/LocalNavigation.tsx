import React, { ReactNode } from 'react';
import style from './LocalNavigation.module.css';

interface IItem {
  label: string;
  icon: ReactNode;
}

interface IProperties {
  current: number;
  items: IItem[];
  onChange: (index: number) => void;
}

const LocalNavigation = ({ current, items, onChange }: IProperties) => (
  <div className={`${style.container}`}>
    {items.map((item, index) => (
      <button
        key={`${item.label}_${index}`}
        type="button"
        className={`${style.menuItem} ${current === index ? style.active : ''}`}
        onClick={() => onChange(index)}
      >
        <div className={style.icon}>{item.icon}</div>
        <span className={style.label}>{item.label}</span>
      </button>
    ))}
  </div>
);

export default LocalNavigation;
