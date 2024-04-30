import React, { ReactNode } from 'react';
import { Flex, Text } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import style from './MenuItem.module.css';

interface IProperties {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
  expanded?: boolean;
}

const MenuItem = ({ to, icon, label, active, expanded }: IProperties) => (
  <Link to={to || '#'} className={style.link}>
    <Flex
      justifyContent="left"
      alignItems="center"
      gap={expanded ? '0.5rem' : '0'}
      className={`${style.menuItem} ${active ? style.active : ''}`}
    >
      <Text as="span" className={style.icon}>
        {icon}
      </Text>
      {expanded && <Text color="inherit">{label}</Text>}
    </Flex>
  </Link>
);

export default MenuItem;
