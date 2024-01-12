import { useEffect, useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { useOutletContext } from 'react-router-dom';
import { calculateAge } from 'utils/dates';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';

const EmploymentSection = () => {
  const [employmentInfo, setEmploymentInfo] = useState();

  const [unemploymentOpen, setUnemploymentOpen] = useState(false);

  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);

  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);

  const { application } = useOutletContext();

  useEffect(() => {
    const getEmploymentInfo = async (applicationID) => {
      try {
        const existingEmploymentInfo = await DataStore.query(
          EmploymentInfo,
          (c) => c.ownerID.eq(applicationID)
        );
        setEmploymentInfo(existingEmploymentInfo[0]);
      } catch (error) {
        console.log('Error fetching the employment info data.');
      }
    };
    if (application) {
      getEmploymentInfo(application.id);
    }
  }, [application]);

  return (
    <>
      <Unemployment
        expanded={unemploymentOpen}
        onExpandedChange={setUnemploymentOpen}
        employmentInfo={employmentInfo}
      />
      <br />
      {employmentInfo?.props?.currentlyUnemployed === 'No' && (
        <>
          <CurrentEmployment
            expanded={currentEmploymentOpen}
            onExpandedChange={setCurrentEmploymentOpen}
            employmentInfo={employmentInfo}
          />
          <br />
        </>
      )}
      {calculateAge(employmentInfo?.props?.currentEmployment?.startDate) < 1 &&
        employmentInfo?.props?.currentEmployment?.firstJob === 'No' && (
          <>
            <PreviousEmployment
              expanded={previousEmploymentOpen}
              onExpandedChange={setPreviousEmploymentOpen}
              employmentInfo={employmentInfo}
            />
            <br />
          </>
        )}
    </>
  );
};

export default EmploymentSection;
