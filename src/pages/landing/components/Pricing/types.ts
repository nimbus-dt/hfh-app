import { ReactNode } from 'react';

export interface PriceProps {
  id: string;
  titleBlack: string;
  titleGray: string;
  message: ReactNode;
  body: {
    id: string;
    type: 'include' | 'exclude';
    text: string;
  }[];
  button: string;
}

export type PricesProps = PriceProps[];
