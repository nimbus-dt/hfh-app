import {
  Application,
} from 'models';
import { dataStoreQueryHookBuilder } from './useDataStoreQuery/useDataStoreQuery';
/* APPLICATION MODEL SERVICES */
export const useApplicationsQuery = dataStoreQueryHookBuilder({
  model: Application,
  defaultDataValue: [],
});
