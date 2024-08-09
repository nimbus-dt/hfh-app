import { Flex } from '@aws-amplify/ui-react';
import LoaderError from 'components/LoaderError';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const HabitatError = () => {
  const error = useRouteError();

  const { t } = useTranslation();

  const containerProps = {
    direction: 'column',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
  };

  let message: string | undefined;
  let hideRetry = false;

  if (isRouteErrorResponse(error)) {
    message = t('pages.habitat.errors.default.message');
    if (error.status === 404) {
      message = t('pages.habitat.errors.404.message');
      hideRetry = true;
    }
  }

  return (
    <Flex {...containerProps}>
      <LoaderError message={message} hideRetry={hideRetry} />
    </Flex>
  );
};

export default HabitatError;
