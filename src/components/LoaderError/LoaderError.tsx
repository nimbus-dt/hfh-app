import React from 'react';
import CustomButton from 'components/CustomButton';
import { MdError } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import styles from './LoaderError.module.css';

interface ILoaderErrorProps {
  message: string;
  hideGoBack?: boolean;
  hideRetry?: boolean;
}

const LoaderError = ({ message, hideGoBack, hideRetry }: ILoaderErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.messageContainer}>
        <MdError className={styles.icon} />
        <span className={styles.message}>{message}</span>
      </div>
      <div className={styles.buttonsContainer}>
        {!hideGoBack && (
          <CustomButton variation="secondary" onClick={() => navigate(-1)}>
            Go back
          </CustomButton>
        )}
        {!hideRetry && (
          <CustomButton onClick={() => navigate(0)}>Retry</CustomButton>
        )}
      </div>
    </div>
  );
};

export default LoaderError;
