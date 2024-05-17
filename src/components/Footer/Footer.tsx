import { Button } from '@aws-amplify/ui-react';
import { MdArrowBack, MdHelpOutline } from 'react-icons/md';

import styles from './Footer.module.css';

interface FooterProps {
  goBack?: () => void;
  submit?: boolean;
  onNext?: () => void;
}

const Footer = ({ goBack, onNext, submit = false }: FooterProps) => (
  <div
    className={`${styles.background} ${
      !goBack && styles.background_without_back
    }`}
  >
    <Button
      variation="link"
      className={goBack ? styles.previous : styles.no_interaction}
      onClick={goBack}
    >
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
      onClick={onNext}
      type="submit"
      variation="primary"
      className={`${styles.next} ${!goBack && styles.next_without_back}`}
    >
      {submit ? 'Submit' : 'Continue'}
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
