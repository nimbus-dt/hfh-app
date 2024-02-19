import {
  ApplicantInfo,
  ApplicantOptional,
  Application,
  Asset,
  Checklist,
  Debt,
  DebtRecord,
  EmploymentInfo,
  HouseholdMember,
  Income,
  IncomeRecord,
  Member,
  Record,
  SavingRecord,
  TestApplication,
  TestCycle,
  Written,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
import { dataStoreQueryByIdHookBuilder } from './useDataStoreQueryById/useDataStoreQueryById';
import { dataStoreObserveQueryHookBuilder } from './useDataStoreObserveQuery/useDataStoreObserveQuery';

/* ASSET MODEL SERVICES */
export const useAssetsQuery = dataStoreQueryHookBuilder({
  model: Asset,
  defaultDataValue: [],
});

/* DEBT MODEL SERVICES */
export const useDebtsQuery = dataStoreQueryHookBuilder({
  model: Debt,
  defaultDataValue: [],
});

/* INCOME MODEL SERVICES */
export const useIncomesQuery = dataStoreQueryHookBuilder({
  model: Income,
  defaultDataValue: [],
});

/* EMPLOYMENTINFO MODEL SERVICES */
export const useEmploymentInfosQuery = dataStoreQueryHookBuilder({
  model: EmploymentInfo,
  defaultDataValue: [],
});

/* MEMBER MODEL SERVICES */
export const useMembersQuery = dataStoreQueryHookBuilder({
  model: Member,
  defaultDataValue: [],
});

/* RECORD MODEL SERVICES */
export const useRecordsQuery = dataStoreQueryHookBuilder({
  model: Record,
  defaultDataValue: [],
});

/* WRITTEN MODEL SERVICES */
export const useWrittensQuery = dataStoreQueryHookBuilder({
  model: Written,
  defaultDataValue: [],
});

/* CHECKLIST MODEL SERVICES */
export const useChecklistsQuery = dataStoreQueryHookBuilder({
  model: Checklist,
  defaultDataValue: [],
});

/* APPLICANTINFO MODEL SERVICES */
export const useApplicantInfosQuery = dataStoreQueryHookBuilder({
  model: ApplicantInfo,
  defaultDataValue: [],
});

/* APPLICANTOPTIONAL MODEL SERVICES */
export const useApplicantOptionalsQuery = dataStoreQueryHookBuilder({
  model: ApplicantOptional,
  defaultDataValue: [],
});

/* TESTAPPLICATION MODEL SERVICES */
export const useTestApplicationsQuery = dataStoreQueryHookBuilder({
  model: TestApplication,
  defaultDataValue: [],
});

export const useTestApplicationById = dataStoreQueryByIdHookBuilder({
  model: TestApplication,
  defaultDataValue: null,
});

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

/* TESTCYCLE MODEL SERVICES */
export const useTestCyclesQuery = dataStoreQueryHookBuilder({
  model: TestCycle,
  defaultDataValue: [],
});

export const useTestCycleById = dataStoreQueryByIdHookBuilder({
  model: TestCycle,
  defaultDataValue: null,
});
