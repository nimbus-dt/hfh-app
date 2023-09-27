import { Habitat } from 'models';
import useDataStoreQuery from 'hooks/services/useDataStoreQuery';
import { SortDirection } from 'aws-amplify';

/**
 * Wrapper to fetch Habitat by urlName
 * @param {Object} params
 * @param {string} params.habitatUrlName
 */
export function useHabitatByUrlName({ habitatUrlName }) {
  const { data, loading, error } = useDataStoreQuery({
    model: Habitat,
    criteria: (c) => c.urlName.eq(habitatUrlName),
    paginationProducer: {
      sort: (s) => s.urlName(SortDirection.ASCENDING),
      page: 0,
      limit: 10,
    },
  });

  return {
    habitat: data?.[0] ?? null,
    loading,
    error,
  };
}
