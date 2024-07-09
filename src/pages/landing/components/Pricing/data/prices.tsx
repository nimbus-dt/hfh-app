import { Text } from '@aws-amplify/ui-react';

import { PricesProps } from '../types';

const prices: PricesProps = [
  {
    id: '2',
    titleBlack: '$125',
    titleGray: '/month',
    message: <span>Small affiliates</span>,
    body: [
      { id: '1', type: 'include', text: 'Custom program forms' },
      { id: '2', type: 'include', text: 'Unlimited application cycles' },
      { id: '3', type: 'include', text: 'Unlimited applications' },
      { id: '4', type: 'include', text: 'Unlimited users' },
      { id: '5', type: 'include', text: 'Access to new features' },
    ],
    button: 'Try For Free',
  },
  {
    id: '3',
    titleBlack: '$200',
    titleGray: '/month',
    message: <span>Medium affiliates</span>,
    body: [
      { id: '1', type: 'include', text: 'Custom program forms' },
      { id: '2', type: 'include', text: 'Unlimited application cycles' },
      { id: '3', type: 'include', text: 'Unlimited applications' },
      { id: '4', type: 'include', text: 'Unlimited users' },
      { id: '5', type: 'include', text: 'Access to new features' },
    ],
    button: 'Try For Free',
  },
  {
    id: '4',
    titleBlack: '$275',
    titleGray: '/month',
    message: <span>Large affiliates</span>,
    body: [
      { id: '1', type: 'include', text: 'Custom program forms' },
      { id: '2', type: 'include', text: 'Unlimited application cycles' },
      { id: '3', type: 'include', text: 'Unlimited applications' },
      { id: '4', type: 'include', text: 'Unlimited users' },
      { id: '5', type: 'include', text: 'Access to new features' },
    ],
    button: 'Try For Free',
  },
];

export default prices;
