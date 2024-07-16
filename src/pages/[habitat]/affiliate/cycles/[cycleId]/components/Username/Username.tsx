import { DataStore } from 'aws-amplify/datastore';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { TestApplication, User } from 'models';
import { useCallback } from 'react';

interface UsernameProps {
  application: TestApplication;
}

const Username = ({ application }: UsernameProps) => {
  const getUsername = useCallback(async () => {
    try {
      const ownerId = application.ownerID;
      if (!(typeof ownerId === 'string')) return 'unknown';

      const user = await DataStore.query(User, (c1) => c1.owner.eq(ownerId));

      const currentUser = user[0];
      if (!currentUser) return 'unknown';
      return `${currentUser.firstName} ${currentUser.lastName}` || 'unknown';
    } catch (e) {
      return 'unknown';
    }
  }, [application]);

  const { value } = useAsync({
    asyncFunction: getUsername,
  });

  return value;
};

export default Username;
