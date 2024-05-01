export interface Inputs {
  startDate: string;
  endDate: string;
  status: null | 'open' | 'close';
}

export interface FilterProps {
  close: () => void;
  filters: Inputs;
  setFilters: (filters: Inputs) => void;
}
