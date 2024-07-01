import { Text } from '@aws-amplify/ui-react';

import { PricesProps } from '../types';

const prices: PricesProps = [
  {
    id: '1',
    titleBlack: 'Free',
    titleGray: '',
    message: (
      <span>
        For affiliates building less than{' '}
        <span style={{ fontWeight: '700', display: 'inline' }}>1 home</span> per
        year
      </span>
    ),
    body: [
      { id: '1', type: 'include', text: 'Custom program forms' },
      { id: '2', type: 'include', text: 'Unlimited application cycles' },
      { id: '3', type: 'include', text: 'Unlimited applications' },
      { id: '4', type: 'include', text: 'Custom metrics' },
    ],
    button: 'Try For Free',
  },
  {
    id: '2',
    titleBlack: '$200',
    titleGray: '/month',
    message: (
      <span>
        For affiliates building more than{' '}
        <span style={{ fontWeight: '700', display: 'inline' }}>1 home</span> per
        year
      </span>
    ),
    body: [
      { id: '1', type: 'include', text: 'Custom program forms' },
      { id: '2', type: 'include', text: 'Unlimited application cycles' },
      { id: '3', type: 'include', text: 'Unlimited applications' },
      { id: '4', type: 'include', text: 'Custom metrics' },
    ],
    button: 'Try For Free',
  },
];

export default prices;
