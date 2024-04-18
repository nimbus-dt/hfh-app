import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';

/**
 * Wrapper for DataStore.observeQuery
 * Read the documentation (https://docs.amplify.aws/lib/datastore/real-time/q/platform/js/#observe-model-mutations-in-real-time)
 * Params are the same as in DataStore.query
 * @param {Object} params
 * @param {function} params.model
 * @param {function} params.criteria read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#predicates
 * @param {Object} [params.paginationProducer]
 * @param {function} [params.paginationProducer.sort] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#sort
 * @param {number} [params.paginationProducer.page] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#pagination
 * @param {number} [params.paginationProducer.limit] read https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#pagination
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useDataStoreObserveQuery({
  model,
  criteria,
  paginationProducer,
  dependencyArray = [],
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const subscription = DataStore.observeQuery(
      model,
      criteria,
      paginationProducer
    ).subscribe({
      next: ({ items, isSynced }) => {
        if (!isSynced) {
          return;
        }

        setData(items);
        setError(null);
        setLoading(false);
      },
      error: (error) => {
        setError(error);
        setData(null);
        setLoading(false);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [criteria, model, paginationProducer, ...dependencyArray]);

  return {
    data,
    loading,
    error,
  };
}

/**
 * To all hooks build from this builder, check useDataStoreQuery documentation
 */
export const dataStoreObserveQueryHookBuilder =
  ({ model, defaultDataValue = [] }) =>
  ({ criteria, paginationProducer, dependencyArray }) => {
    const { data, loading, error } = useDataStoreObserveQuery({
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
