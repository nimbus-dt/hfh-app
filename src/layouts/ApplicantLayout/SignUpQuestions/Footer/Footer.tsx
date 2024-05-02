import { Button } from '@aws-amplify/ui-react';
import { MdArrowBack, MdHelpOutline } from 'react-icons/md';

import styles from './Footer.module.css';

const Footer = () => (
  <div className={styles.background}>
    <Button variation="link" className={styles.previous}>
      <MdArrowBack
        className={styles.hide_on_small}
        size="24px"
        style={{ marginRight: '1rem' }}
      />
      Go Back
    </Button>
    <Button variation="primary" className={styles.next}>
      Continue
    </Button>
    <div className={styles.help_icon}>
      <MdHelpOutline size="1.5rem" color="#757575" />
    </div>
  </div>
);

export default Footer;
