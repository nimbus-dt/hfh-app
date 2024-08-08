import { Flex } from '@aws-amplify/ui-react';
import LoaderError from 'components/LoaderError';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const HabitatError = () => {
  const error = useRouteError();

  const containerProps = {
    direction: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  };

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <Flex {...containerProps}>
        <LoaderError message="Habitat not found." hideRetry />
      </Flex>
    );
  }

  return (
    <Flex {...containerProps}>
      <LoaderError message="An error ocurred while fetching habitat data." />
    </Flex>
  );
};

export default HabitatError;
