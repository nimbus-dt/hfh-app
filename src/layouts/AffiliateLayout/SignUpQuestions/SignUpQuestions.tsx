import { useState } from 'react';
import Header from 'components/Header';
import Loading from 'components/Loading';
import useHabitat from 'hooks/utils/useHabitat';
import styles from './SignUpQuestions.module.css';
import General from './General';
import Affiliate from './Affiliate';
import Confirmation from './Confirmation';
import dataProps, { SignUpQuestionsProps } from './types';
import pages from './utils/pages';

const initialData: dataProps = {
  current: 0,
};

const SignUpQuestions = ({ user, isUserAllowed }: SignUpQuestionsProps) => {
  const [data, setData] = useState<dataProps>(initialData);

  const { habitat } = useHabitat();

  const goBack = () => {
    setData((prev) => ({
      ...prev,
      current: prev.current - 1,
    }));
  };

  const body = [
    <General data={data} setData={setData} />,
    <Affiliate data={data} setData={setData} goBack={goBack} user={user} />,
    <Confirmation
      name={habitat?.urlName}
      longName={habitat?.longName}
      isUserAllowed={isUserAllowed}
    />,
  ];

  if (!user) {
    return <Loading />;
  }

  return (
    <div className={styles.page}>
      <Header current={data.current} pages={pages} />
      {body[data.current]}
    </div>
  );
};

export default SignUpQuestions;
