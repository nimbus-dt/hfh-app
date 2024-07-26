import { useCallback, useEffect, useState } from 'react';
import { Status } from 'utils/enums';

interface useAsyncProps<T> {
  asyncFunction: () => Promise<T>;
  immediate?: boolean;
}

const useAsync = <T,>({
  asyncFunction,
  immediate = true,
}: useAsyncProps<T>) => {
  const [status, setStatus] = useState<Status>(Status.PENDING);
  const [value, setValue] = useState<T | undefined>(undefined);
  const [error, setError] = useState<string>('');

  const execute = useCallback(async () => {
    setStatus(Status.PENDING);
    setValue(undefined);
    setError('');
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus(Status.FULFILLED);
    } catch (e) {
      if (typeof e === 'string') {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
      setStatus(Status.REJECTED);
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, status, value, setValue, error };
};

export default useAsync;
