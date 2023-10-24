import { UserProps } from 'models';
import useDataStoreQuery from 'hooks/services/useDataStoreQuery';

/**
 * Wrapper to fetch UserProps by username
 * @param {Object} params
 * @param {string} params.username
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useUserPropsByUsername({ username, dependencyArray }) {
  const { data, loading, error } = useDataStoreQuery({
    model: UserProps,
    criteria: (u) => u.ownerID.eq(username),
    paginationProducer: {
      page: 0,
      limit: 1,
    },
    dependencyArray,
  });

  return {
    userProps: data?.[0] ?? null,
    loading,
    error,
  };
}
