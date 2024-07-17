/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hub } from 'aws-amplify';
import { usePostHog } from 'posthog-js/react';

import { Authenticator, Button, useAuthenticator } from '@aws-amplify/ui-react';

import useHabitat from 'hooks/utils/useHabitat';

import styles from './styles.module.css';

interface AuthProps {
  type: 'applicant' | 'affiliate';
}

const AuthComponent = ({ type }: AuthProps) => {
  const { t } = useTranslation();
  const { habitat } = useHabitat();

  const header = habitat?.authenticationHeader || '';

  const posthog = usePostHog();

  const auth = useAuthenticator();

  useEffect(() => {
    const cancelListen = Hub.listen('auth', (data) => {
      const { payload } = data;
      if (payload.event === 'signIn') {
        const { data: user } = payload;
        posthog?.identify(user?.attributes?.email, {
          ...user,
          type,
          habitat,
        });
        posthog?.group('habitat', habitat?.name || 'unknown');
        posthog?.group('type', type || 'unknown');
        posthog?.capture('clicked_sign_in');
      }
    });

    return () => {
      cancelListen();
    };
  }, [habitat, posthog, type]);

  const formFields = {
    signIn: {
      username: {
        label: t('components.authentication.auth.signin.username.label'),
        placeholder: t(
          'components.authentication.auth.signin.username.placeholder'
        ),
      },
      password: {
        label: t('components.authentication.auth.signin.password.label'),
        placeholder: t(
          'components.authentication.auth.signin.password.placeholder'
        ),
      },
    },
  };

  const components = {
    SignIn: {
      Header() {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: header,
            }}
          />
        );
        return null;
      },
      Footer() {
        return (
          <div className={styles.options}>
            <div className={styles['reset-password']}>
              <Button
                onClick={auth.toResetPassword}
                variation="link"
                isFullWidth
              >
                Forgot Password
              </Button>
            </div>
            <div className={styles.signup}>
              <div className={styles['signup-prompt']}>
                <span className={styles['signup-prompt-line']} />
                <p className={styles['signup-prompt-message']}>
                  Do not have an account?
                </p>
                <span className={styles['signup-prompt-line']} />
              </div>
              <Button
                className={styles['signup-button']}
                fontWeight="normal"
                onClick={auth.toSignUp}
                isFullWidth
              >
                Sign up
              </Button>
            </div>
          </div>
        );
      },
    },
    SignUp: {
      Header() {
        return (
          <div
            dangerouslySetInnerHTML={{
              __html: header,
            }}
          />
        );
        return null;
      },
      Footer() {
        return (
          <div className={styles['signup-container']}>
            <div className={styles.signup}>
              <div className={styles['signup-prompt']}>
                <span className={styles['signup-prompt-line']} />
                <p className={styles['signup-prompt-message']}>
                  Have an account already?
                </p>
                <span className={styles['signup-prompt-line']} />
              </div>
              <Button
                className={styles['signup-button']}
                fontWeight="normal"
                onClick={auth.toSignIn}
                isFullWidth
              >
                Back to Sign In
              </Button>
            </div>
          </div>
        );
      },
    },
  };

  return <Authenticator formFields={formFields} components={components} />;
};

export default AuthComponent;
