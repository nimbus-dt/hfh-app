import { ApplicationTypes, ReviewStatus } from 'models';

export interface Inputs {
  startDateSubmitted: string;
  endDateSubmitted: string;
  type: ApplicationTypes | null;
  reviewStatus: ReviewStatus | null;
  customStatus: string;
}

export interface FilterProps {
  close: () => void;
  filters: Inputs;
  setFilters: (filters: Inputs) => void;
  customStatuses: string[];
}
