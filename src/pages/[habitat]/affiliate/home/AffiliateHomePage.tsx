import React from 'react';
import { useTranslation } from 'react-i18next';

const AffiliateHomePage = () => {
  const { t } = useTranslation();
  return <h1>{t('pages.underConstruction.message')}</h1>;
};

export default AffiliateHomePage;
