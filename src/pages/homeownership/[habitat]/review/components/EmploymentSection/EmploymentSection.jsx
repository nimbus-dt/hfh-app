import { useEffect, useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { useOutletContext } from 'react-router-dom';
import { calculateAgeInMonths } from 'utils/dates';
import PropTypes from 'prop-types';
import { useApplicantInfosQuery } from 'hooks/services';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';

const EmploymentSection = ({
  unemploymentOpen,
  setUnemploymentOpen,
  handleUnemploymentOnReview,
  currentEmploymentOpen,
  setCurrentEmploymentOpen,
  handleCurrentEmploymentOnReview,
  previousEmploymentOpen,
  setPreviousEmploymentOpen,
  handlePreviousAddressOnReview,
  coApplicantUnemploymentOpen,
  setCoApplicantUnemploymentOpen,
  handleCoApplicantUnemploymentOnReview,
  coApplicantCurrentEmploymentOpen,
  setCoApplicantCurrentEmploymentOpen,
  handleCoApplicantCurrentEmploymentOnReview,
  coApplicantPreviousEmploymentOpen,
  setCoApplicantPreviousEmploymentOpen,
  handleCoApplicantPreviousAddressOnReview,
  reviewedSections,
  setReviewedSections,
  submitted,
}) => {
  const [employmentInfo, setEmploymentInfo] = useState();

  const { application, habitat } = useOutletContext();

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  });

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
            employmentInfo?.props?.currentlyUnemployed === 'No',
            applicantInfos[0]?.props?.hasCoApplicant === 'Yes'
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
                ) < habitat?.props.homeownershipMinCurrentEmploymentMonths &&
                  employmentInfo?.props?.currentEmployment?.firstJob === 'No',
                applicantInfos[0]?.props?.hasCoApplicant === 'Yes'
              )
            }
            submitted={submitted}
          />
          <br />
        </>
      )}
      {calculateAgeInMonths(
        employmentInfo?.props?.currentEmployment?.startDate
      ) < habitat?.props.homeownershipMinCurrentEmploymentMonths &&
        employmentInfo?.props?.currentEmployment?.firstJob === 'No' && (
          <>
            <PreviousEmployment
              expanded={previousEmploymentOpen}
              onExpandedChange={setPreviousEmploymentOpen}
              employmentInfo={employmentInfo}
              reviewedSections={reviewedSections}
              setReviewedSections={setReviewedSections}
              onReview={() =>
                handlePreviousAddressOnReview(
                  applicantInfos[0]?.props?.hasCoApplicant === 'Yes'
                )
              }
              submitted={submitted}
            />
            <br />
          </>
        )}
      {applicantInfos[0]?.props?.hasCoApplicant === 'Yes' && (
        <>
          <Unemployment
            expanded={coApplicantUnemploymentOpen}
            onExpandedChange={setCoApplicantUnemploymentOpen}
            employmentInfo={employmentInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={() =>
              handleCoApplicantUnemploymentOnReview(
                employmentInfo?.props?.coApplicantCurrentlyUnemployed === 'No'
              )
            }
            submitted={submitted}
            coApplicant
          />
          <br />
          {employmentInfo?.props?.coApplicantCurrentlyUnemployed === 'No' && (
            <>
              <CurrentEmployment
                expanded={coApplicantCurrentEmploymentOpen}
                onExpandedChange={setCoApplicantCurrentEmploymentOpen}
                employmentInfo={employmentInfo}
                reviewedSections={reviewedSections}
                setReviewedSections={setReviewedSections}
                onReview={() =>
                  handleCoApplicantCurrentEmploymentOnReview(
                    calculateAgeInMonths(
                      employmentInfo?.props?.coApplicantCurrentEmployment
                        ?.startDate
                    ) <
                      habitat?.props.homeownershipMinCurrentEmploymentMonths &&
                      employmentInfo?.props?.coApplicantCurrentEmployment
                        ?.firstJob === 'No'
                  )
                }
                submitted={submitted}
                coApplicant
              />
              <br />
            </>
          )}
          {calculateAgeInMonths(
            employmentInfo?.props?.coApplicantCurrentEmployment?.startDate
          ) < habitat?.props.homeownershipMinCurrentEmploymentMonths &&
            employmentInfo?.props?.coApplicantCurrentEmployment?.firstJob ===
              'No' && (
              <>
                <PreviousEmployment
                  expanded={coApplicantPreviousEmploymentOpen}
                  onExpandedChange={setCoApplicantPreviousEmploymentOpen}
                  employmentInfo={employmentInfo}
                  reviewedSections={reviewedSections}
                  setReviewedSections={setReviewedSections}
                  onReview={handleCoApplicantPreviousAddressOnReview}
                  submitted={submitted}
                  coApplicant
                />
                <br />
              </>
            )}
        </>
      )}
    </>
  );
};

EmploymentSection.propTypes = {
  unemploymentOpen: PropTypes.bool,
  setUnemploymentOpen: PropTypes.func,
  handleUnemploymentOnReview: PropTypes.func,
  currentEmploymentOpen: PropTypes.bool,
  setCurrentEmploymentOpen: PropTypes.func,
  handleCurrentEmploymentOnReview: PropTypes.func,
  previousEmploymentOpen: PropTypes.bool,
  setPreviousEmploymentOpen: PropTypes.func,
  handlePreviousAddressOnReview: PropTypes.func,
  coApplicantUnemploymentOpen: PropTypes.bool,
  setCoApplicantUnemploymentOpen: PropTypes.func,
  handleCoApplicantUnemploymentOnReview: PropTypes.func,
  coApplicantCurrentEmploymentOpen: PropTypes.bool,
  setCoApplicantCurrentEmploymentOpen: PropTypes.func,
  handleCoApplicantCurrentEmploymentOnReview: PropTypes.func,
  coApplicantPreviousEmploymentOpen: PropTypes.bool,
  setCoApplicantPreviousEmploymentOpen: PropTypes.func,
  handleCoApplicantPreviousAddressOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
};

export default EmploymentSection;
