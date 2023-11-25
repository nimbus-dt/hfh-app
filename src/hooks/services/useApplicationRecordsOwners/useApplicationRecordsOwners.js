import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { UserProps } from 'models';
import { isAdult } from 'utils/dates';

/**
 * Wrapper for DataStore.query for quering for a single item
 * Read the documentation (https://docs.amplify.aws/lib/datastore/data-access/q/platform/js/#querying-for-a-single-item)
 * @param {Object} params
 * @param {object} params.currentUser
 * @param {array} params.householdMembers
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useApplicationRecordsOwners({
  currentUser,
  householdMembers,
  dependencyArray = [],
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!currentUser) {
      return;
    }

    async function fetchData() {
      try {
        const userProps = await DataStore.query(UserProps, (c) =>
          c.ownerID.eq(currentUser.username)
        );

        const ownersArray = [
          userProps[0],
          ...householdMembers.filter(
            (member) =>
              isAdult(member?.dateOfBirth ?? '') && !member?.isUnemployed
          ),
        ];

        if (ignore) {
          return;
        }

        setData(ownersArray);
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
  }, [...dependencyArray]);

  return {
    data,
    loading,
    error,
  };
}
