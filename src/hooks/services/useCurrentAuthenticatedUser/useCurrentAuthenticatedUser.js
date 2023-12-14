import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';

/**
 * Wrapper for Auth.currentAuthenticatedUser
 * Read the documentation (https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/#retrieve-current-authenticated-user)
 * @param {object} params
 * @param {boolean} params.bypassCache
 * @param {[]} [params.dependencyArray = []] array of dependencies to refetch query
 */
export function useCurrentAuthenticatedUser({
  bypassCache = false,
  dependencyArray = [],
} = {}) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      try {
        const currentUserResponse = await Auth.currentAuthenticatedUser({
          bypassCache,
        });

        if (ignore) {
          return;
        }

        setCurrentUser(currentUserResponse);
        setError(null);
      } catch (error) {
        setError(error);
        setCurrentUser(null);
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
    currentUser,
    loading,
    error,
  };
}
