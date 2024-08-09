import React from 'react';
import LoaderError from 'components/LoaderError';
import { useTranslation } from 'react-i18next';
import styles from './Landing.error.module.css';

const AppError = () => {
  const { t } = useTranslation();

  const message = t('pages.landing.errors.default.message');

  return (
    <div className={styles.container}>
      <LoaderError message={message} />
    </div>
  );
};

export default AppError;
