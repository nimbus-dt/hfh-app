import { MdArrowBack, MdHelpOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Button } from '@aws-amplify/ui-react';

import styles from './Footer.module.css';
import FooterProps from './Footer.types';

const Footer = ({ goBack, onNext, submit = false }: FooterProps) => {
  const { t } = useTranslation();

  const classname = {
    background: `${styles.background} ${
      !goBack && styles.background_without_back
    }`,
    back: goBack ? styles.previous : styles.no_interaction,
    next: `${styles.next} ${!goBack && styles.next_without_back}`,
    help: `${styles.help_icon} ${!goBack && styles.help_icon_without_back}`,
  };

  const nextText = submit
    ? t('components.footer.review')
    : t('components.footer.continue');

  return (
    <div className={classname.background}>
      <Button variation="link" className={classname.back} onClick={goBack}>
        {goBack && (
          <>
            <MdArrowBack
              className={styles.hide_on_small}
              size="24px"
              style={{ marginRight: '1rem' }}
            />
            {t('components.footer.goBack')}
          </>
        )}
      </Button>
      <Button
        onClick={onNext}
        type="submit"
        variation="primary"
        className={classname.next}
      >
        {nextText}
      </Button>
      <div className={classname.help}>
        <MdHelpOutline size="1.5rem" color="#757575" />
      </div>
    </div>
  );
};

export default Footer;
