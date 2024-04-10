import { useOutletContext } from 'react-router-dom';
import { Form } from '@formio/react';
import CustomCard from 'components/CustomCard';
import 'utils/customComponents';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const HomeownershipHomePage = () => {
  const { application, habitat, openCycle } = useOutletContext();

  if (!habitat || !openCycle) {
    return <p>loading...</p>;
  }

  return (
    <CustomCard>
      <Form
        src={`${FORMIO_URL}/loudoun`}
        onSubmit={console.log}
        options={{
          additional: {
            application,
            habitat,
            openCycle,
          },
        }}
      />
    </CustomCard>
  );
};

export default HomeownershipHomePage;
