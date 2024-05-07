import { useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';

import Header from 'components/Header';

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
    />,
  ];

  return (
    <ScrollView height="100vh" className={styles.page}>
      <Header habitat={habitat} current={data.current} pages={pages} />
      {body[data.current]}
    </ScrollView>
  );
};

export default SignUpQuestions;
