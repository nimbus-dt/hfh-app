import { useState } from 'react';
import { ScrollView } from '@aws-amplify/ui-react';

import { Habitat as HabitatModel } from 'models';

import styles from './SignUpQuestions.module.css';
import General from './General';
import Household from './Household';
import Employment from './Employment';
import Habitat from './Habitat';
import Header from './Header';
import dataProps from './types';

const initialData: dataProps = {
  current: 0,
};

interface SignUpQuestionsProps {
  habitat: HabitatModel;
}

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
      <Header
        habitat={habitat}
        current={data.current}
        sections={['General', 'Household', 'Employment', 'Habitat']}
      />
      {body[data.current]}
    </ScrollView>
  );
};

export default SignUpQuestions;
