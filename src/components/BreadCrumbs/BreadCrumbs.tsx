import React from 'react';
import { Link } from 'react-router-dom';
import styles from './BreadCrumb.module.css';

type TItem = {
  to?: string;
  label: string;
};

interface IProperties {
  items: TItem[];
}

const BreadCrumbs = ({ items }: IProperties) => (
  <div
    className={`theme-body-medium ${styles.hide_on_small} ${styles.breadcrumb}`}
  >
    {items.map((item, index) => (
      <div key={item.label}>
        <Link to={item.to || '#'} className={styles.link}>
          <span>{item.label}</span>
        </Link>
        {index + 1 < items.length && <span>&gt;</span>}
      </div>
    ))}
  </div>
);

export default BreadCrumbs;
