import { Image } from '@aws-amplify/ui-react';
import MaintenanceLogo from 'assets/images/maintenance.png';
import styles from './Maintenance.module.css';

const MaintenancePage = () => (
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
        We are currently improving Habitat App 🔨
      </h1>
      <div className={`theme-body-medium ${styles.content}`}>
        <p>
          We apologize for the inconvenience, but we&apos;re performing some
          maintenance. You can still contact us at support@habitat-app.org.
          We&apos;ll be back soon!
        </p>
        <p>- The Habitat App Team</p>
      </div>
    </div>
  </div>
);

export default MaintenancePage;
