import React from 'react';
import styles from './Explanation.module.css';

const Explanation = () => (
  <span className={`theme-body-medium ${styles.subtitle}`}>
    Please complete the following short sign-up form. This is{' '}
    <strong className={styles.strong}>NOT</strong> an application; it's a
    general questionnaire for new users of the Habitat App. After completing
    this form, you will be redirected to your official application.
  </span>
);

export default Explanation;
