import { type Theme } from '@aws-amplify/ui-react';

import components from './components';

import './styles.css';

const theme: Theme = {
  name: 'habitat-theme',
  tokens: {
    colors: {
      neutral: {
        10: { value: '#FFFDFD' },
        20: { value: '#FAFAFA' },
        40: { value: '#EEEEEE' },
        80: { value: '#BDBDBD' },
        90: { value: '#757575' },
        100: { value: '#1F1F1F' },
      },
      primary: {
        30: { value: '#EDF2FF' },
        40: { value: '#DBE3F7' },
        50: { value: '#B8C7EE' },
        60: { value: '#94ACE7' },
        70: { value: '#7090DF' },
        80: { value: '#325CCA' },
        90: { value: '#294BA6' },
        100: { value: '#173A86' },
        110: { value: '#092C76' },
      },
      secondary: {
        30: { value: '#E6F4ED' },
        40: { value: '#CFE8DA' },
        50: { value: '#B6DDC7' },
        60: { value: '#9FD1B4' },
        70: { value: '#89C6A2' },
        80: { value: '#73BB90' },
        90: { value: '#62AA7C' },
        100: { value: '#399065' },
        110: { value: '#256A47' },
      },
      black: { value: '#1F1F1F' },
      white: { value: '#FFFDFD' },
    },
    fonts: {
      default: {
        variable: { value: 'inter, sans-serif' },
        static: { value: 'inter, sans-serif' },
      },
    },
    fontSizes: {
      xxxs: { value: '12px' },
      xxs: { value: '12px' },
      xs: { value: '14px' },
      small: { value: '16px' },
      medium: { value: '18px' },
      large: { value: '20px' },
      xl: { value: '24px' },
      xxl: { value: '36px' },
      xxxl: { value: '48px' },
      xxxxl: { value: '64px' },
    },
    fontWeights: {
      hairline: { value: 100 },
      thin: { value: 200 },
      light: { value: 300 },
      normal: { value: 400 },
      medium: { value: 500 },
      semibold: { value: 600 },
      bold: { value: 700 },
      extrabold: { value: 800 },
      black: { value: 900 },
    },
    lineHeights: {
      small: { value: '24px' },
      medium: { value: '30px' },
      large: { value: '56px' },
    },
    components,
  },
};

export default theme;
