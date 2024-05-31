import {
  Decision,
  FormAnswer,
  Note,
  RootForm,
  TestApplication,
  TestCycle,
  User,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
import { dataStoreQueryByIdHookBuilder } from './useDataStoreQueryById/useDataStoreQueryById';

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
