/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Hub, I18n } from 'aws-amplify';
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

  I18n.setLanguage(localStorage.getItem('lng') || 'en');

  I18n.putVocabulariesForLanguage(t('langCode'), {
    'Sign In': t('components.authentication.auth.vocabularies.signIn'),
    'Sign in': t('components.authentication.auth.vocabularies.signIn'),
    'Sign in to your account': t(
      'components.authentication.auth.vocabularies.signInToYourAccount'
    ),
    'Signing in': t('components.authentication.auth.vocabularies.signingIn'),
    Username: t('components.authentication.auth.vocabularies.username'),
    Password: t('components.authentication.auth.vocabularies.password'),
    'Forgot your password?': t(
      'components.authentication.auth.vocabularies.forgotYourPassword'
    ),
    'Reset Password': t(
      'components.authentication.auth.vocabularies.resetPassword'
    ),
    'Enter your email': t(
      'components.authentication.auth.vocabularies.enterYourEmail'
    ),
    'Send code': t('components.authentication.auth.vocabularies.sendCode'),
    'Back to Sign In': t(
      'components.authentication.auth.vocabularies.backToSignIn'
    ),
    'Username cannot be empty': t(
      'components.authentication.auth.errors.usernameCannotBeEmpty'
    ),
    'Custom auth lambda trigger is not configured for the user pool.': t(
      'components.authentication.auth.errors.customAuthLambdaTriggerIsNotConfiguredForTheUserPool'
    ),
    'User does not exist.': t(
      'components.authentication.auth.errors.userDoesNotExist'
    ),
    'Incorrect username or password.': t(
      'components.authentication.auth.errors.incorrectUsernameOrPassword'
    ),
    'Create Account': t(
      'components.authentication.auth.vocabularies.createAccount'
    ),
  });

  const formFields = {
    signIn: {
      username: {
        label: t('components.authentication.auth.signIn.username.label'),
        placeholder: t(
          'components.authentication.auth.signIn.username.placeholder'
        ),
      },
      password: {
        label: t('components.authentication.auth.signIn.password.label'),
        placeholder: t(
          'components.authentication.auth.signIn.password.placeholder'
        ),
      },
    },
    signUp: {
      email: {
        label: t('components.authentication.auth.signUp.email.label'),
        placeholder: t(
          'components.authentication.auth.signUp.email.placeholder'
        ),
      },
      password: {
        label: t('components.authentication.auth.signUp.password.label'),
        placeholder: t(
          'components.authentication.auth.signUp.password.placeholder'
        ),
      },
      confirm_password: {
        label: t('components.authentication.auth.signUp.confirmPassword.label'),
        placeholder: t(
          'components.authentication.auth.signUp.confirmPassword.placeholder'
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
                {t(
                  'components.authentication.auth.signIn.footer.forgotPassword'
                )}
              </Button>
            </div>
            <div className={styles.signup}>
              <div className={styles['signup-prompt']}>
                <span className={styles['signup-prompt-line']} />
                <p className={styles['signup-prompt-message']}>
                  {t(
                    'components.authentication.auth.signIn.footer.doNotHaveAnAccount'
                  )}
                </p>
                <span className={styles['signup-prompt-line']} />
              </div>
              <Button
                className={styles['signup-button']}
                fontWeight="normal"
                onClick={auth.toSignUp}
                isFullWidth
              >
                {t('components.authentication.auth.signIn.footer.signUp')}
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
                  {t(
                    'components.authentication.auth.signUp.footer.haveAnAccountAlready'
                  )}
                </p>
                <span className={styles['signup-prompt-line']} />
              </div>
              <Button
                className={styles['signup-button']}
                fontWeight="normal"
                onClick={auth.toSignIn}
                isFullWidth
              >
                {t('components.authentication.auth.signUp.footer.backToSignIn')}
              </Button>
            </div>
          </div>
        );
      },
    },
  };

  return (
    <Authenticator
      formFields={formFields}
      components={components}
      i18nIsDynamicList
    />
  );
};

export default AuthComponent;
