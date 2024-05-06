import { useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';

import Header from 'components/Header';
import { Habitat as HabitatModel } from 'models';

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
  habitat: HabitatModel;
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

const SignUpQuestions = ({ habitat }: SignUpQuestionsProps) => {
  const [data, setData] = useState<dataProps>(initialData);

  const goBack = () => {
    setData((prev) => ({
      ...prev,
      current: prev.current - 1,
    }));
  };

  const body = [
    <General data={data} setData={setData} />,
    <Household data={data} setData={setData} goBack={goBack} />,
    <Employment data={data} setData={setData} goBack={goBack} />,
    <Habitat data={data} setData={setData} goBack={goBack} habitat={habitat} />,
  ];

  return (
    <ScrollView height="100vh" className={styles.page}>
      <Header habitat={habitat} current={data.current} pages={pages} />
      {body[data.current]}
    </ScrollView>
  );
};

export default SignUpQuestions;
