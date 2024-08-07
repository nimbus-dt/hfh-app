import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ResultsCounter.module.css';

interface IResultsCounterProps {
  number: number;
}

const ResultsCounter = ({ number }: IResultsCounterProps) => {
  const { t } = useTranslation();
  return (
    <span className={styles.text}>{`${number} ${t(
      'components.resultsCounter.results'
    )}`}</span>
  );
};

export default ResultsCounter;
