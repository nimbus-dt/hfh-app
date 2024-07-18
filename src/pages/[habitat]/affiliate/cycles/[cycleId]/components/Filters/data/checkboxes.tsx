import reviewStatusInputsData from './reviewStatusData';
import typeInputsData from './typeInputsData';

interface CheckboxProps {
  title: string;
  name: 'startDateSubmitted' | 'endDateSubmitted' | 'type' | 'reviewStatus';
  data: { name: string; label: string; type: string }[];
}

export const typeCheckbox: CheckboxProps = {
  title: 'Type',
  name: 'type',
  data: typeInputsData,
};

export const reviewStatusCheckbox: CheckboxProps = {
  title: 'Status',
  name: 'reviewStatus',
  data: reviewStatusInputsData,
};
