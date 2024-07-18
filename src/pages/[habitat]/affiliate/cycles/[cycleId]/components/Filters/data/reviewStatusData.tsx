import { ReviewStatus } from 'models';

const reviewStatusInputsData = [
  {
    name: '',
    label: 'Pending',
    type: ReviewStatus.PENDING,
  },
  {
    name: '',
    label: 'Accepted',
    type: ReviewStatus.ACCEPTED,
  },
  {
    name: '',
    label: 'Denied',
    type: ReviewStatus.DENIED,
  },
  {
    name: '',
    label: 'Returned',
    type: ReviewStatus.RETURNED,
  },
];

export default reviewStatusInputsData;
