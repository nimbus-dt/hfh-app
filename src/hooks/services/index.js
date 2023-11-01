import {
  Application,
  DebtRecord,
  HouseholdMember,
  IncomeRecord,
  SavingRecord,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
import { dataStoreQueryByIdHookBuilder } from './useDataStoreQueryById/useDataStoreQueryById';
import { dataStoreObserveQueryHookBuilder } from './useDataStoreObserveQuery/useDataStoreObserveQuery';

/* APPLICATION MODEL SERVICES */
export const useApplicationsQuery = dataStoreQueryHookBuilder({
  model: Application,
  defaultDataValue: [],
});

export const useApplicationById = dataStoreQueryByIdHookBuilder({
  model: Application,
  defaultDataValue: null,
});

/* SAVING RECORD MODEL SERVICES */
export const useSavingRecordsQuery = dataStoreQueryHookBuilder({
  model: SavingRecord,
  defaultDataValue: [],
});

export const useSavingRecordsObserveQuery = dataStoreObserveQueryHookBuilder({
  model: SavingRecord,
  defaultDataValue: [],
});

/* INCOME RECORD MODEL SERVICES */
export const useIncomeRecordsQuery = dataStoreQueryHookBuilder({
  model: IncomeRecord,
  defaultDataValue: [],
});

export const useIncomeRecordsObserveQuery = dataStoreObserveQueryHookBuilder({
  model: IncomeRecord,
  defaultDataValue: [],
});

/* DEBT RECORD MODEL SERVICES */
export const useDebtRecordsQuery = dataStoreQueryHookBuilder({
  model: DebtRecord,
  defaultDataValue: [],
});

export const useDebtRecordsObserveQuery = dataStoreObserveQueryHookBuilder({
  model: DebtRecord,
  defaultDataValue: [],
});

/* HOUSEHOLD MEMBER MODEL SERVICES */
export const useHouseholdMembersQuery = dataStoreQueryHookBuilder({
  model: HouseholdMember,
  defaultDataValue: [],
});

export const useHouseholdMembersObserveQuery = dataStoreObserveQueryHookBuilder(
  {
    model: HouseholdMember,
    defaultDataValue: [],
  }
);
