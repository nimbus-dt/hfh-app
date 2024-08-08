import React from 'react';
import LoaderError from 'components/LoaderError';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './page.error.module.css';

const RootFormError = () => {
  const error = useRouteError();

  const { t } = useTranslation();

  let message = t('pages.habitat.affiliate.cycles.errors.default.message');
  let hideRetry = false;

  if (isRouteErrorResponse(error) && error.status === 404) {
    message = t('pages.habitat.affiliate.cycles.errors.404.message');
    hideRetry = true;
  }

  return (
    <div className={styles.container}>
      <LoaderError message={message} hideRetry={hideRetry} />
    </div>
  );
};

export default RootFormError;
