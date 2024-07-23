import { TFunction } from 'i18next';
import { ReviewStatus } from 'models';

const reviewStatusInputsData = (t: TFunction<'translation', undefined>) => [
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.reviewStatusData.pending'
    ),
    type: ReviewStatus.PENDING,
  },
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.reviewStatusData.accepted'
    ),
    type: ReviewStatus.ACCEPTED,
  },
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.reviewStatusData.denied'
    ),
    type: ReviewStatus.DENIED,
  },
  {
    name: '',
    label: t(
      'pages.habitat.affiliate.cycles.cycle.components.filters.data.reviewStatusData.returned'
    ),
    type: ReviewStatus.RETURNED,
  },
];

export default reviewStatusInputsData;
