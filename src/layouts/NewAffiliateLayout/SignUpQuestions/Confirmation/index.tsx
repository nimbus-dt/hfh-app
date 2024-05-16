import styles from './Confirmation.module.css';

interface ConfirmationProps {
  name?: string | null;
}

const Confirmation = ({ name }: ConfirmationProps) => (
  <div className={styles.message}>
    <p className="theme-body-medium">
      For security reasons, a member of HabitatApp needs to verify your sign up.
      We are currently revising your information and confirming that you have
      authorization by {name}. Once we have revised your information, we will
      send you an email.
    </p>
    <p className="theme-body-medium">The HabitatApp Team</p>
  </div>
);

export default Confirmation;
