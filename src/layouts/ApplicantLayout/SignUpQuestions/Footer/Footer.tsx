import { Button } from '@aws-amplify/ui-react';
import { MdArrowBack, MdHelpOutline } from 'react-icons/md';

import styles from './Footer.module.css';

interface FooterProps {
  goBack?: () => void;
}

const Footer = ({ goBack }: FooterProps) => (
  <div
    className={`${styles.background} ${
      !goBack && styles.background_without_back
    }`}
  >
    <Button variation="link" className={styles.previous} onClick={goBack}>
      {goBack && (
        <>
          <MdArrowBack
            className={styles.hide_on_small}
            size="24px"
            style={{ marginRight: '1rem' }}
          />
          Go Back
        </>
      )}
    </Button>
    <Button
      type="submit"
      variation="primary"
      className={`${styles.next} ${!goBack && styles.next_without_back}`}
    >
      Continue
    </Button>
    <div
      className={`${styles.help_icon} ${
        !goBack && styles.help_icon_without_back
      }`}
    >
      <MdHelpOutline size="1.5rem" color="#757575" />
    </div>
  </div>
);

export default Footer;
