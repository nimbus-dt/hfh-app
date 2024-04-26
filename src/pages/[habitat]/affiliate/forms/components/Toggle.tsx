import { Button, Flex } from '@aws-amplify/ui-react';
import React from 'react';
import style from './Toggle.module.css';

type TValue = 'current' | 'past';

interface IProperties {
  value: TValue;
  onChange: (newValue: TValue) => void;
}

const Toggle = ({ value, onChange }: IProperties) => (
  <Flex gap="0" className={`${style.toggle}`}>
    <Button
      className={`${style.button} ${value === 'current' ? style.selected : ''}`}
      onClick={() => onChange('current')}
    >
      Current
    </Button>
    <Button
      className={`${style.button} ${value === 'past' ? style.selected : ''}`}
      onClick={() => onChange('past')}
    >
      Past
    </Button>
  </Flex>
);

export default Toggle;
