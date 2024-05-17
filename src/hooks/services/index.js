import {
  ApplicantInfo,
  ApplicantOptional,
  Asset,
  Checklist,
  Debt,
  Decision,
  EmploymentInfo,
  // Form,
  FormAnswer,
  Income,
  Member,
  Note,
  Property,
  Record,
  RootForm,
  TestApplication,
  TestCycle,
  User,
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

/* DECISION MODEL SERVICES */
export const useDecisionsQuery = dataStoreQueryHookBuilder({
  model: Decision,
  defaultDataValue: [],
});

/* FORM MODEL SERVICES */
export const useFormById = dataStoreQueryByIdHookBuilder({
  model: RootForm,
  defaultDataValue: null,
});

/* ROOT FORM MODEL SERVICES */
export const useRootFormsQuery = dataStoreQueryHookBuilder({
  model: RootForm,
  defaultDataValue: [],
});

export const useRootFormById = dataStoreQueryByIdHookBuilder({
  model: RootForm,
  defaultDataValue: null,
});

/* FORMANSWERS MODEL SERVICES */
/*  USER MODEL SERVICES */
export const useUserQuery = dataStoreQueryHookBuilder({
  model: User,
  defaultDataValue: [],
});

/* FORMANSWERS MODEL SERVICES */
export const useFormAnswersQuery = dataStoreQueryHookBuilder({
  model: FormAnswer,
  defaultDataValue: [],
});
