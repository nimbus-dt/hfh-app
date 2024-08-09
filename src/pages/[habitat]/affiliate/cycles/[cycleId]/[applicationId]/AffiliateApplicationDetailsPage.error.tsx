import React from 'react';
import LoaderError from 'components/LoaderError';
import { useTranslation } from 'react-i18next';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styles from './AffiliateApplicationDetailsPage.error.module.css';

const AffiliateApplicationDetailsPageError = () => {
  const error = useRouteError();
  const { t } = useTranslation();

  let message: string | undefined;
  let hideRetry = false;

  if (isRouteErrorResponse(error)) {
    message = t(
      'pages.habitat.affiliate.cycles.cycle.application.errors.default.message'
    );
    if (error.status === 404) {
      message = t(
        'pages.habitat.affiliate.cycles.cycle.application.errors.404.message'
      );
      hideRetry = true;
    }
  }

  return (
    <div className={styles.container}>
      <LoaderError message={message} hideRetry={hideRetry} />
    </div>
  );
};

export default AffiliateApplicationDetailsPageError;
