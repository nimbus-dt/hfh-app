import { useEffect, useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { useOutletContext } from 'react-router-dom';
import { calculateAgeInMonths } from 'utils/dates';
import PropTypes from 'prop-types';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';

const EmploymentSection = ({
  unemploymentOpen,
  setUnemploymentOpen,
  currentEmploymentOpen,
  setCurrentEmploymentOpen,
  previousEmploymentOpen,
  setPreviousEmploymentOpen,
  reviewedSections,
  setReviewedSections,
  handleUnemploymentOnReview,
  handleCurrentEmploymentOnReview,
  handlePreviousAddressOnReview,
  submitted,
}) => {
  const [employmentInfo, setEmploymentInfo] = useState();

  const { application, habitat } = useOutletContext();

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
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() =>
          handleUnemploymentOnReview(
            employmentInfo?.props?.currentlyUnemployed === 'No'
          )
        }
        submitted={submitted}
      />
      <br />
      {employmentInfo?.props?.currentlyUnemployed === 'No' && (
        <>
          <CurrentEmployment
            expanded={currentEmploymentOpen}
            onExpandedChange={setCurrentEmploymentOpen}
            employmentInfo={employmentInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={() =>
              handleCurrentEmploymentOnReview(
                calculateAgeInMonths(
                  employmentInfo?.props?.currentEmployment?.startDate
                ) < habitat?.props.minCurrentEmploymentMonths &&
                  employmentInfo?.props?.currentEmployment?.firstJob === 'No'
              )
            }
            submitted={submitted}
          />
          <br />
        </>
      )}
      {calculateAgeInMonths(
        employmentInfo?.props?.currentEmployment?.startDate
      ) < habitat?.props.minCurrentEmploymentMonths &&
        employmentInfo?.props?.currentEmployment?.firstJob === 'No' && (
          <>
            <PreviousEmployment
              expanded={previousEmploymentOpen}
              onExpandedChange={setPreviousEmploymentOpen}
              employmentInfo={employmentInfo}
              reviewedSections={reviewedSections}
              setReviewedSections={setReviewedSections}
              onReview={handlePreviousAddressOnReview}
              submitted={submitted}
            />
            <br />
          </>
        )}
    </>
  );
};

EmploymentSection.propTypes = {
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  unemploymentOpen: PropTypes.bool,
  setUnemploymentOpen: PropTypes.func,
  currentEmploymentOpen: PropTypes.bool,
  setCurrentEmploymentOpen: PropTypes.func,
  previousEmploymentOpen: PropTypes.bool,
  setPreviousEmploymentOpen: PropTypes.func,
  handleUnemploymentOnReview: PropTypes.func,
  handleCurrentEmploymentOnReview: PropTypes.func,
  handlePreviousAddressOnReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default EmploymentSection;
