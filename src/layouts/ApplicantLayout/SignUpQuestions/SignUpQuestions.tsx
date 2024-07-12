import { useState } from 'react';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { User } from 'models';
import styles from './SignUpQuestions.module.css';
import General from './General';
import Household from './Household';
import Employment from './Employment';
import Habitat from './Habitat';
import dataProps from './types';

const initialData: dataProps = {
  current: 0,
};

interface SignUpQuestionsProps {
  user: {
    username: string;
  };
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const pages = [
  {
    number: 1,
    step: 1,
    section: 'General',
  },
  {
    number: 2,
    step: 2,
    section: 'Household',
  },
  {
    number: 3,
    step: 3,
    section: 'Employment',
  },
  {
    number: 4,
    step: 4,
    section: 'Habitat',
  },
];

const SignUpQuestions = ({ user, setUserData }: SignUpQuestionsProps) => {
  const [data, setData] = useState<dataProps>(initialData);

  const goBack = () => {
    setData((prev) => ({
      ...prev,
      current: prev.current - 1,
    }));
  };

  if (!user) {
    return <Loading />;
  }

  const body = [
    <General data={data} setData={setData} />,
    <Household data={data} setData={setData} goBack={goBack} />,
    <Employment data={data} setData={setData} goBack={goBack} />,
    <Habitat
      data={data}
      setData={setData}
      goBack={goBack}
      user={user}
      setUserData={setUserData}
    />,
  ];

  return (
    <div className={styles.page}>
      <Header current={data.current} pages={pages} />
      {body[data.current]}
    </div>
  );
};

export default SignUpQuestions;
