import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useRoutes from 'hooks/utils/useRoutes/useRoutes';
import { useAuthenticator, useBreakpointValue } from '@aws-amplify/ui-react';
import { getRouteTitle } from 'utils/routes';
import { useUserQuery } from 'hooks/services';
import { LazyUser } from 'models';
import TranslationContext from 'contexts/TranslationsContext';
import { useTranslation } from 'react-i18next';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { RecursiveModelPredicate } from 'aws-amplify/datastore';
import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import styles from './BaseLayout.module.css';
import BaseLayoutProps from './BaseLayout.types';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const BaseLayout = ({ variation, children, hideSideBar }: BaseLayoutProps) => {
  const location = useLocation();
  const ROUTES = useRoutes();
  const { i18n } = useTranslation();
  const { language } = i18n;

  const title = getRouteTitle(location.pathname, ROUTES);

  const isMobile = useBreakpointValue({
    base: true,
    medium: false,
  });

  const { user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

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

  const { data: userData } = useUserQuery({
    criteria: (c1: RecursiveModelPredicate<LazyUser>) =>
      c1.and((c2) => {
        const criteriaArr = user ? [c2.owner.eq(user.username as string)] : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [user],
  });

  const [expandSideBar, setExpandSideBar] = useState(false);

  const handleOnExpand = () => {
    if (isMobile) {
      setExpandSideBar((prevExpandSideBar) => !prevExpandSideBar);
    }
  };

  let initials = '';

  if (userData) {
    const tempUser = userData[0];
    const firstNameInit = tempUser?.firstName.charAt(0);
    const lastNameInit = tempUser?.lastName.charAt(0);
    initials = firstNameInit + lastNameInit;
  }

  return (
    <TranslationContext.Provider value={value}>
      <div className={styles.layout}>
        {!hideSideBar && (
          <SideBar
            pathname={location.pathname}
            mobile={typeof isMobile === 'boolean' && isMobile}
            expanded={expandSideBar}
            onExpand={handleOnExpand}
            variation={variation}
          />
        )}
        <div className={styles.rightSide}>
          <TopBar
            title={title || ''}
            initials={initials}
            mobile={typeof isMobile === 'boolean' && isMobile}
            onExpand={handleOnExpand}
          />
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </TranslationContext.Provider>
  );
};

export default BaseLayout;
