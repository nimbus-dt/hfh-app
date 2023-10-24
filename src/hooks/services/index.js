import {
  Application,
  DebtRecord,
  HouseholdMember,
  IncomeRecord,
  SavingRecord,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
import { dataStoreQueryByIdHookBuilder } from './useDataStoreQueryById/useDataStoreQueryById';

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

/* INCOME RECORD MODEL SERVICES */
export const useIncomeRecordsQuery = dataStoreQueryHookBuilder({
  model: IncomeRecord,
  defaultDataValue: [],
});

/* DEBT RECORD MODEL SERVICES */
export const useDebtRecordsQuery = dataStoreQueryHookBuilder({
  model: DebtRecord,
  defaultDataValue: [],
});

/* HOUSEHOLD MEMBER MODEL SERVICES */
export const useHouseholdMembersQuery = dataStoreQueryHookBuilder({
  model: HouseholdMember,
  defaultDataValue: [],
});
