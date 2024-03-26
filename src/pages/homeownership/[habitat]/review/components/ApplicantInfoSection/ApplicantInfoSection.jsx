import PropTypes from 'prop-types';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApplicantInfo, Member } from 'models';
import { DataStore } from 'aws-amplify';
import { maritalStatusValues } from '../../../applicant-info/HomeownershipApplicantInfoPage.schema';
import BasicInformation from './components/BasicInformation';
import UnmarriedAddendum from './components/UnmarriedAddendum';
import Address from './components/Address';
import PrevAddress from './components/PrevAddress';
import TypeOfCredit from './components/TypeOfCredit';
import CoApplicant from './components/CoApplicant';

const ApplicantInfoSection = ({
  basicInfoOpen,
  setBasicInfoOpen,
  handleBasicInformationOnReview,
  unmarriedAddendumOpen,
  setUnmarriedAddendumOpen,
  handleUnmarriedAddendumOnReview,
  currentAddressOpen,
  setCurrentAddressOpen,
  handleAddressOnReview,
  previousAddressOpen,
  setPreviousAddressOpen,
  handlePreviousAddressOnReview,
  typeOfCreditOpen,
  setTypeOfCreditOpen,
  handleTypeOfCreditOnReview,
  coApplicantOpen,
  setCoApplicantOpen,
  handleCoApplicantOnReview,
  coApplicantBasicInfoOpen,
  setCoApplicantBasicInfoOpen,
  handleCoApplicantBasicInformationOnReview,
  coApplicantUnmarriedAddendumOpen,
  setCoApplicantUnmarriedAddendumOpen,
  handleCoApplicantUnmarriedAddendumOnReview,
  coApplicantCurrentAddressOpen,
  setCoApplicantCurrentAddressOpen,
  handleCoApplicantAddressOnReview,
  coApplicantPreviousAddressOpen,
  setCoApplicantPreviousAddressOpen,
  handleCoApplicantPreviousAddressOnReview,
  reviewedSections,
  setReviewedSections,
  submitted,
  shouldRenderCoApplicant,
}) => {
  const { application, habitat } = useOutletContext();

  const [applicantInfo, setApplicantInfo] = useState();

  const [coApplicantMember, setCoApplicantMember] = useState();

  useEffect(() => {
    const getApplicationInfo = async (applicationID) => {
      try {
        const existingApplicantInfo = await DataStore.query(
          ApplicantInfo,
          (c) => c.ownerID.eq(applicationID)
        );

        setApplicantInfo(existingApplicantInfo[0]);
      } catch (error) {
        console.log('Error fetching the applicant info data.');
      }
    };
    if (application) {
      getApplicationInfo(application.id);
    }
  }, [application]);

  useEffect(() => {
    const getCoApplicantMember = async (applicationID) => {
      try {
        const existingMembers = await DataStore.query(Member, (c) =>
          c.and((c2) => [
            c2.testapplicationID.eq(applicationID),
            c2.isCoApplicant.eq(true),
          ])
        );
        setCoApplicantMember(existingMembers[0]);
      } catch (error) {
        console.log('Error fetching the members data.');
      }
    };
    if (application) {
      getCoApplicantMember(application.id);
    }
  }, [application]);

  return (
    <>
      <BasicInformation
        expanded={basicInfoOpen}
        onExpandedChange={setBasicInfoOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() =>
          handleBasicInformationOnReview(
            applicantInfo?.props?.unmarriedAddendum
          )
        }
        submitted={submitted}
      />
      <br />
      {applicantInfo?.props?.unmarriedAddendum && (
        <>
          <UnmarriedAddendum
            expanded={unmarriedAddendumOpen}
            onExpandedChange={setUnmarriedAddendumOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleUnmarriedAddendumOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
      <Address
        expanded={currentAddressOpen}
        onExpandedChange={setCurrentAddressOpen}
        applicantInfo={applicantInfo}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={() =>
          handleAddressOnReview(
            applicantInfo?.props?.currentAddress?.monthsLivedHere <
              habitat?.props.homeownershipMinCurrentAddressMonths
          )
        }
        submitted={submitted}
      />
      <br />
      {applicantInfo?.props?.previousAddress && (
        <>
          <PrevAddress
            expanded={previousAddressOpen}
            onExpandedChange={setPreviousAddressOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handlePreviousAddressOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
      {shouldRenderCoApplicant && (
        <>
          <TypeOfCredit
            expanded={typeOfCreditOpen}
            onExpandedChange={setTypeOfCreditOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleTypeOfCreditOnReview}
            submitted={submitted}
          />
          <br />
          <CoApplicant
            expanded={coApplicantOpen}
            onExpandedChange={setCoApplicantOpen}
            applicantInfo={applicantInfo}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={() =>
              handleCoApplicantOnReview(
                applicantInfo?.props?.hasCoApplicant === 'Yes'
              )
            }
            submitted={submitted}
          />
          <br />
          {applicantInfo?.props?.hasCoApplicant === 'Yes' && (
            <>
              <BasicInformation
                expanded={coApplicantBasicInfoOpen}
                onExpandedChange={setCoApplicantBasicInfoOpen}
                applicantInfo={applicantInfo}
                reviewedSections={reviewedSections}
                setReviewedSections={setReviewedSections}
                onReview={() =>
                  handleCoApplicantBasicInformationOnReview(
                    applicantInfo?.props?.coApplicantUnmarriedAddendum
                  )
                }
                submitted={submitted}
                coApplicant
                coApplicantMember={coApplicantMember}
              />
              <br />
              {applicantInfo?.props?.coApplicantBasicInfo?.maritalStatus ===
                maritalStatusValues[2] && (
                <>
                  <UnmarriedAddendum
                    expanded={coApplicantUnmarriedAddendumOpen}
                    onExpandedChange={setCoApplicantUnmarriedAddendumOpen}
                    applicantInfo={applicantInfo}
                    reviewedSections={reviewedSections}
                    setReviewedSections={setReviewedSections}
                    onReview={handleCoApplicantUnmarriedAddendumOnReview}
                    submitted={submitted}
                    coApplicant
                  />
                  <br />
                </>
              )}
              <Address
                expanded={coApplicantCurrentAddressOpen}
                onExpandedChange={setCoApplicantCurrentAddressOpen}
                applicantInfo={applicantInfo}
                reviewedSections={reviewedSections}
                setReviewedSections={setReviewedSections}
                onReview={() =>
                  handleCoApplicantAddressOnReview(
                    applicantInfo?.props?.coApplicantCurrentAddress
                      ?.monthsLivedHere <
                      habitat?.props.homeownershipMinCurrentAddressMonths
                  )
                }
                submitted={submitted}
                coApplicant
              />
              <br />
              {applicantInfo?.props?.coApplicantCurrentAddress
                ?.monthsLivedHere <
                habitat?.props.homeownershipMinCurrentAddressMonths && (
                <>
                  <PrevAddress
                    expanded={coApplicantPreviousAddressOpen}
                    onExpandedChange={setCoApplicantPreviousAddressOpen}
                    applicantInfo={applicantInfo}
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
      )}
    </>
  );
};

ApplicantInfoSection.propTypes = {
  basicInfoOpen: PropTypes.bool,
  setBasicInfoOpen: PropTypes.func,
  handleBasicInformationOnReview: PropTypes.func,
  unmarriedAddendumOpen: PropTypes.bool,
  setUnmarriedAddendumOpen: PropTypes.func,
  handleUnmarriedAddendumOnReview: PropTypes.func,
  currentAddressOpen: PropTypes.bool,
  setCurrentAddressOpen: PropTypes.func,
  handleAddressOnReview: PropTypes.func,
  previousAddressOpen: PropTypes.bool,
  setPreviousAddressOpen: PropTypes.func,
  handlePreviousAddressOnReview: PropTypes.func,
  typeOfCreditOpen: PropTypes.bool,
  setTypeOfCreditOpen: PropTypes.func,
  handleTypeOfCreditOnReview: PropTypes.func,
  coApplicantOpen: PropTypes.bool,
  setCoApplicantOpen: PropTypes.func,
  handleCoApplicantOnReview: PropTypes.func,
  coApplicantBasicInfoOpen: PropTypes.bool,
  setCoApplicantBasicInfoOpen: PropTypes.func,
  handleCoApplicantBasicInformationOnReview: PropTypes.func,
  coApplicantUnmarriedAddendumOpen: PropTypes.bool,
  setCoApplicantUnmarriedAddendumOpen: PropTypes.func,
  handleCoApplicantUnmarriedAddendumOnReview: PropTypes.func,
  coApplicantCurrentAddressOpen: PropTypes.bool,
  setCoApplicantCurrentAddressOpen: PropTypes.func,
  handleCoApplicantAddressOnReview: PropTypes.func,
  coApplicantPreviousAddressOpen: PropTypes.bool,
  setCoApplicantPreviousAddressOpen: PropTypes.func,
  handleCoApplicantPreviousAddressOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
  shouldRenderCoApplicant: PropTypes.bool,
};

export default ApplicantInfoSection;
