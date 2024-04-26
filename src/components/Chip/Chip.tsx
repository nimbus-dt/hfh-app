import { View } from '@aws-amplify/ui-react';
import React from 'react';
import style from './Chip.module.css';

interface IProperties {
  text: string;
  variation:
    | 'warning'
    | 'review'
    | 'danger'
    | 'success'
    | 'disabled'
    | 'active';
}

const Chip = ({ variation, text }: IProperties) => (
  <View className={`${style.chip} ${style[variation]} theme-body-small`}>
    {text}
  </View>
);

export default Chip;
