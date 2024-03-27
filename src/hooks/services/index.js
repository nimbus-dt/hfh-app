import {
  ApplicantInfo,
  ApplicantOptional,
  Asset,
  Checklist,
  Debt,
  EmploymentInfo,
  Income,
  Member,
  Note,
  Property,
  Record,
  TestApplication,
  TestCycle,
  Written,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
import { dataStoreQueryByIdHookBuilder } from './useDataStoreQueryById/useDataStoreQueryById';

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

/* TESTCYCLE MODEL SERVICES */
export const useTestCyclesQuery = dataStoreQueryHookBuilder({
  model: TestCycle,
  defaultDataValue: [],
});

export const useTestCycleById = dataStoreQueryByIdHookBuilder({
  model: TestCycle,
  defaultDataValue: null,
});

/* PROPERTY MODEL SERVICES */
export const usePropertiesQuery = dataStoreQueryHookBuilder({
  model: Property,
  defaultDataValue: [],
});

/* NOTE MODEL SERVICES */
export const useNotesQuery = dataStoreQueryHookBuilder({
  model: Note,
  defaultDataValue: [],
});
