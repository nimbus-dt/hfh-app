import { Button, Flex } from '@aws-amplify/ui-react';
import React from 'react';
import style from './Toggle.module.css';

type TOption<TValue> = {
  value: TValue;
  label: string;
};

interface IProperties<TValue> {
  option1: TOption<TValue>;
  option2: TOption<TValue>;
  active: TValue;
  onChange: (newValue: TValue) => void;
}

const Toggle = <TValue,>({
  option1,
  option2,
  active,
  onChange,
}: IProperties<TValue>) => (
  <Flex gap="0" className={`${style.toggle}`}>
    <Button
      className={`${style.button} ${
        active === option1.value ? style.selected : ''
      }`}
      onClick={() => onChange(option1.value)}
    >
      {option1.label}
    </Button>
    <Button
      className={`${style.button} ${
        active === option2.value ? style.selected : ''
      }`}
      onClick={() => onChange(option2.value)}
    >
      {option2.label}
    </Button>
  </Flex>
);

export default Toggle;
