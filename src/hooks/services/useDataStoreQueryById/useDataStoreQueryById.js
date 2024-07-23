import { useState, useEffect } from 'react';
import { DataStore } from 'aws-amplify/datastore';

/**
 * Wrapper for DataStore.query for quering for a single item
 * Read the documentation (https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#querying-for-a-single-item)
 * @param {Object} params
 * @param {function} params.model
 * @param {string} params.id
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useDataStoreQueryById({ model, id, dependencyArray = [] }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const response = await DataStore.query(model, id);

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
 * To all hooks build from this builder, check useDataStoreQueryById documentation
 */
export const dataStoreQueryByIdHookBuilder =
  ({ model, defaultDataValue }) =>
  ({ id, dependencyArray }) => {
    const { data, loading, error } = useDataStoreQueryById({
      model,
      id,
      dependencyArray,
    });

    return {
      data: data ?? defaultDataValue,
      loading,
      error,
    };
  };
