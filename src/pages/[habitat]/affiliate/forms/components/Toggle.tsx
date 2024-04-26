import { Button, Flex } from '@aws-amplify/ui-react';
import React from 'react';
import style from './Toggle.module.css';

type TValue = 'active' | 'pending';

interface IProperties {
  value: TValue;
  onChange: (newValue: TValue) => void;
}

const Toggle = ({ value, onChange }: IProperties) => (
  <Flex gap="0" className={`${style.toggle}`}>
    <Button
      className={`${style.button} ${value === 'active' ? style.selected : ''}`}
      onClick={() => onChange('active')}
    >
      Active
    </Button>
    <Button
      className={`${style.button} ${value === 'pending' ? style.selected : ''}`}
      onClick={() => onChange('pending')}
    >
      Pending
    </Button>
  </Flex>
);

export default Toggle;
