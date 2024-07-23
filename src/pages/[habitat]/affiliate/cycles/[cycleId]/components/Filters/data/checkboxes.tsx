import { TFunction } from 'i18next';
import reviewStatusInputsData from './reviewStatusData';
import typeInputsData from './typeInputsData';

interface CheckboxProps {
  title: string;
  name: 'startDateSubmitted' | 'endDateSubmitted' | 'type' | 'reviewStatus';
  data: { name: string; label: string; type: string }[];
}

export const typeCheckbox = (
  t: TFunction<'translation', undefined>
): CheckboxProps => ({
  title: t(
    'pages.habitat.affiliate.cycles.cycle.components.filters.data.checkboxes.type'
  ),
  name: 'type',
  data: typeInputsData(t),
});

export const reviewStatusCheckbox = (
  t: TFunction<'translation', undefined>
): CheckboxProps => ({
  title: t(
    'pages.habitat.affiliate.cycles.cycle.components.filters.data.checkboxes.status'
  ),
  name: 'reviewStatus',
  data: reviewStatusInputsData(t),
});
