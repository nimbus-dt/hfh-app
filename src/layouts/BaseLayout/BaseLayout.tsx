import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useBreakpointValue } from '@aws-amplify/ui-react';

import TranslationContext from 'contexts/TranslationsContext';
import useAsync from 'hooks/utils/useAsync/useAsync';

import SideBar from './components/SideBar';
import TopBar from './components/TopBar';
import styles from './BaseLayout.module.css';
import BaseLayoutProps from './BaseLayout.types';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const BaseLayout = ({ variation, children, hideSideBar }: BaseLayoutProps) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const location = useLocation();

  const [expand, setExpand] = useState(false);

  const base = useBreakpointValue({
    base: true,
    medium: false,
  });

  const mobile = typeof base === 'boolean' && base;

  const handleOnExpand = () => {
    if (base) {
      setExpand((prevExpandSideBar) => !prevExpandSideBar);
    }
  };

  const fetchTranslations = useCallback(async () => {
    const response = await fetch(
      `${FORMIO_URL}/language/submission?data.language=${language}&data.form=app`
    );
    const array = await response.json();

    const { translation } = array[0].data;
    Object.keys(translation).forEach((key) => {
      const newKey = key.replace(/__DOT__/g, '.');
      translation[newKey] = translation[key];
      if (newKey !== key) {
        delete translation[key];
      }
    });
    return {
      [`${language}`]: translation,
    };
  }, [language]);

  const { value } = useAsync({
    asyncFunction: fetchTranslations,
  });

  return (
    <TranslationContext.Provider value={value}>
      <div className={styles.layout}>
        {!hideSideBar && (
          <SideBar
            pathname={location.pathname}
            mobile={mobile}
            expanded={expand}
            onExpand={handleOnExpand}
            variation={variation}
          />
        )}
        <div className={styles.rightSide}>
          <TopBar mobile={mobile} onExpand={handleOnExpand} />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </TranslationContext.Provider>
  );
};

export default BaseLayout;
