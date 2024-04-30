export interface Inputs {
  startDate: Date | '';
  endDate: Date | '';
  status: null | 'open' | 'close';
}

export interface FilterProps {
  close: () => void;
  filters: Inputs;
  setFilters: (filters: Inputs) => void;
}
