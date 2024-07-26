import { Navigate } from 'react-router-dom';

import styles from './Confirmation.module.css';

interface ConfirmationProps {
  name?: string | null;
  longName?: string | null;
  isUserAllowed: boolean;
}

const Confirmation = ({ name, longName, isUserAllowed }: ConfirmationProps) => {
  if (isUserAllowed) {
    return <Navigate to={`/${name}/affiliate/forms`} replace />;
  }

  localStorage.setItem('goto', 'forms');

  return (
    <div className={styles.message}>
      <p className="theme-body-medium">
        For security reasons, a member of HabitatApp needs to verify your sign
        up. We are currently revising your information and confirming that you
        have authorization by {longName}. Once we have revised your information,
        we will send you an email.
      </p>
      <p className="theme-body-medium">The HabitatApp Team</p>
    </div>
  );
};

export default Confirmation;
