import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DataStore } from 'aws-amplify';

import { Image } from '@aws-amplify/ui-react';

import MaintenanceLogo from 'assets/images/maintenance.png';
import { Maintenance } from 'models';

import styles from './Maintenance.module.css';

const MaintenancePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMaintenance = async () => {
      const response = await DataStore.query(Maintenance);

      const { maintenance } = response[0];

      if (!maintenance) {
        navigate('/');
      }
    };
    fetchMaintenance();
  }, [navigate]);
  return (
    <div className={styles.background}>
      <header className={styles.header}>
        <Image
          src={MaintenanceLogo}
          alt="maintenance logo"
          width="200px"
          height="53.18px"
        />
      </header>
      <div className={styles.body}>
        <h1 className={`theme-subtitle-s1 ${styles.title}`}>
          {t('pages.maintenance.title')}
        </h1>
        <div className={`theme-body-medium ${styles.content}`}>
          <p>{t('pages.maintenance.message')}</p>
          <p>{t('pages.maintenance.from')}</p>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
