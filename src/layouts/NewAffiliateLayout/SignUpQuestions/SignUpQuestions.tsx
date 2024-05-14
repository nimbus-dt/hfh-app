import { useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';

import Header from 'components/Header';
import Loading from 'components/Loading';

import styles from './SignUpQuestions.module.css';
import General from './General';
import Affiliate from './Affiliate';
import dataProps, { SignUpQuestionsProps } from './types';
import pages from './utils/pages';

const initialData: dataProps = {
  current: 0,
};

const SignUpQuestions = ({ habitat, user }: SignUpQuestionsProps) => {
  const [data, setData] = useState<dataProps>(initialData);
  const [finished, setFinished] = useState<boolean>(false);

  const goBack = () => {
    setData((prev) => ({
      ...prev,
      current: prev.current - 1,
    }));
  };

  const body = [
    <General data={data} setData={setData} />,
    <Affiliate
      data={data}
      setData={setData}
      goBack={goBack}
      habitat={habitat}
      user={user}
      setFinished={setFinished}
    />,
  ];

  if (!habitat || !user) {
    return <Loading />;
  }

  return (
    <ScrollView height="100vh" className={styles.page}>
      <Header
        habitat={habitat}
        current={data.current}
        pages={!finished ? pages : []}
      />
      {!finished ? (
        body[data.current]
      ) : (
        <div className={styles.message}>
          <p className="theme-body-medium">
            For security reasons, a member of HabitatApp needs to verify your
            sign up. We are currently revising your information and confirming
            that you have authorization by {habitat?.name}. Once we have revised
            your information, we will send you an email.
          </p>
          <p className="theme-body-medium">The HabitatApp Team</p>
        </div>
      )}
    </ScrollView>
  );
};

export default SignUpQuestions;
