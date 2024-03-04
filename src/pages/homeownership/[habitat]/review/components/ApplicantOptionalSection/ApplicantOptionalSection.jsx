import { DataStore } from 'aws-amplify';
import { ApplicantOptional } from 'models';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useApplicantInfosQuery } from 'hooks/services';
import ApplicantMilitaryServiceSection from './components/ApplicantMilitaryServiceSection';
import AnyoneElseMilitaryServiceSection from './components/AnyoneElseMilitaryServiceSection';
import DemographicSection from './components/DemographicSection';

const ApplicantOptionalSection = ({
  applicantMilitaryServiceOpen,
  setApplicantMilitaryServiceOpen,
  handleApplicantMilitaryServiceOnReview,
  anyoneElseMilitaryServiceOpen,
  setAnyoneElseMilitaryServiceOpen,
  handleAnyoneElseMilitaryServiceOnReview,
  demographicOpen,
  setDemographicOpen,
  handleDemographicOnReview,
  coApplicantDemographicOpen,
  setCoApplicantDemographicOpen,
  handleCoApplicantDemographicOnReview,
  reviewedSections,
  setReviewedSections,
  submitted,
}) => {
  const { application } = useOutletContext();

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  });

  const hasCoApplicant = applicantInfos[0]?.props?.hasCoApplicant === 'Yes';

  const [applicantOptional, setApplicantOptional] = useState();

  useEffect(() => {
    const getApplicationOptional = async (applicationID) => {
      try {
        const existingApplicantOptional = await DataStore.query(
          ApplicantOptional,
          (c) => c.ownerID.eq(applicationID)
        );
        setApplicantOptional(existingApplicantOptional[0]);
      } catch (error) {
        console.log('Error fetching the applicant info data.');
      }
    };
    if (application) {
      getApplicationOptional(application.id);
    }
  }, [application]);

  return (
    <>
      <ApplicantMilitaryServiceSection
        expanded={applicantMilitaryServiceOpen}
        onExpandedChange={setApplicantMilitaryServiceOpen}
        applicantOptional={applicantOptional}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleApplicantMilitaryServiceOnReview}
        submitted={submitted}
      />
      <br />
      <AnyoneElseMilitaryServiceSection
        expanded={anyoneElseMilitaryServiceOpen}
        onExpandedChange={setAnyoneElseMilitaryServiceOpen}
        applicantOptional={applicantOptional}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleAnyoneElseMilitaryServiceOnReview}
        submitted={submitted}
      />
      <br />
      <DemographicSection
        expanded={demographicOpen}
        onExpandedChange={setDemographicOpen}
        applicantOptional={applicantOptional}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() => handleDemographicOnReview(hasCoApplicant)}
        submitted={submitted}
      />
      <br />
      {hasCoApplicant && (
        <>
          <DemographicSection
            expanded={coApplicantDemographicOpen}
            onExpandedChange={setCoApplicantDemographicOpen}
            applicantOptional={applicantOptional}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleCoApplicantDemographicOnReview}
            submitted={submitted}
            coApplicant
          />
          <br />
        </>
      )}
    </>
  );
};

ApplicantOptionalSection.propTypes = {
  applicantMilitaryServiceOpen: PropTypes.bool,
  setApplicantMilitaryServiceOpen: PropTypes.func,
  handleApplicantMilitaryServiceOnReview: PropTypes.func,
  anyoneElseMilitaryServiceOpen: PropTypes.bool,
  setAnyoneElseMilitaryServiceOpen: PropTypes.func,
  handleAnyoneElseMilitaryServiceOnReview: PropTypes.func,
  demographicOpen: PropTypes.bool,
  setDemographicOpen: PropTypes.func,
  handleDemographicOnReview: PropTypes.func,
  coApplicantDemographicOpen: PropTypes.bool,
  setCoApplicantDemographicOpen: PropTypes.func,
  handleCoApplicantDemographicOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
};

export default ApplicantOptionalSection;
