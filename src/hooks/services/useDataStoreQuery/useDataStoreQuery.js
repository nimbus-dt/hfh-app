import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify/datastore';

/**
 * Wrapper for DataStore.query
 * Read the documentation (https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#query-data)
 * @param {Object} params
 * @param {function} params.model
 * @param {function} params.criteria read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#predicates
 * @param {Object} [params.paginationProducer]
 * @param {function} [params.paginationProducer.sort] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#sort
 * @param {number} [params.paginationProducer.page] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#pagination
 * @param {number} [params.paginationProducer.limit] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#pagination
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useDataStoreQuery({
  model,
  criteria,
  paginationProducer,
  dependencyArray = [],
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const response = await DataStore.query(
          model,
          criteria,
          paginationProducer
        );

        if (ignore) {
          return;
        }

        setData(response);
        setError(null);
      } catch (error) {
        setError(error);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencyArray]);

  return {
    data,
    loading,
    error,
  };
}

/**
 * To all hooks build from this builder, check useDataStoreQuery documentation
 */
export const dataStoreQueryHookBuilder =
  ({ model, defaultDataValue }) =>
  ({ criteria, paginationProducer, dependencyArray }) => {
    const { data, loading, error } = useDataStoreQuery({
      model,
      criteria,
      paginationProducer,
      dependencyArray,
    });

    return {
      data: data ?? defaultDataValue,
      loading,
      error,
    };
  };
