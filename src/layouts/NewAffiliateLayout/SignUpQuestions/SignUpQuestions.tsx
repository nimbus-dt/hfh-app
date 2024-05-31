import { useState } from 'react';

import Header from 'components/Header';
import Loading from 'components/Loading';

import styles from './SignUpQuestions.module.css';
import General from './General';
import Affiliate from './Affiliate';
import Confirmation from './Confirmation';
import dataProps, { SignUpQuestionsProps } from './types';
import pages from './utils/pages';

const initialData: dataProps = {
  current: 0,
};

const SignUpQuestions = ({
  habitat,
  user,
  setUserData,
}: SignUpQuestionsProps) => {
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
    <Confirmation name={habitat?.longName} />,
  ];

  if (!habitat || !user) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <Header habitat={habitat} current={data.current} pages={pages} />
      {body[data.current]}
    </div>
  );
};

export default SignUpQuestions;
