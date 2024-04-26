/* eslint-disable react/no-danger */
/* eslint-disable react/no-unstable-nested-components */
import { Authenticator, Button, useAuthenticator } from '@aws-amplify/ui-react';

import styles from './styles.module.css';

interface AuthProps {
  header: string;
}

const Auth = ({ header }: AuthProps) => {
  const auth = useAuthenticator();

  const formFields = {
    signIn: {
      username: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your Password:',
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

export default Auth;
