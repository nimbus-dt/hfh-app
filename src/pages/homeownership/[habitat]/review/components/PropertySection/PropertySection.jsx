import { useEffect, useState } from 'react';
import { Property } from 'models';
import { DataStore } from 'aws-amplify';
import { useOutletContext } from 'react-router-dom';
import PropTypes from 'prop-types';
import RealStateOwnership from './components/RealStateOwnership';
import MortgagePayment from './components/MortgagePayment';
import RentPayment from './components/RentPayment';
import LandOwnership from './components/LandOwnership';

export default function PropertySection({
  landOwnershipOpen,
  setLandOwnershipOpen,
  handleLandOwnershipOnReview,
  mortgageOpen,
  setMortgageOpen,
  handleMortgageOnReview,
  realStateOwnershipOpen,
  setRealStateOwnershipOpen,
  handleRealStateOwnershipOnReview,
  rentPaymentOpen,
  setRentPaymentOpen,
  handlerentPaymentOnReview,
  reviewedSections,
  setReviewedSections,
  submitted,
}) {
  const [property, setProperty] = useState();

  const { application } = useOutletContext();

  useEffect(() => {
    const getProperty = async (applicationID) => {
      try {
        const existingProperty = await DataStore.query(Property, (c) =>
          c.ownerID.eq(applicationID)
        );
        setProperty(existingProperty[0]);
      } catch (error) {
        console.log('Error fetching the property data.');
      }
    };
    if (application) {
      getProperty(application.id);
    }
  }, [application]);

  return (
    <>
      <RealStateOwnership
        expanded={realStateOwnershipOpen}
        onExpandedChange={setRealStateOwnershipOpen}
        property={property}
        reviewedSections={reviewedSections}
        setReviewedSections={setReviewedSections}
        onReview={handleRealStateOwnershipOnReview}
        submitted={submitted}
      />
      <br />
      {property?.props?.ownRealState === 'Yes' && (
        <>
          <MortgagePayment
            expanded={mortgageOpen}
            onExpandedChange={setMortgageOpen}
            property={property}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleMortgageOnReview}
            submitted={submitted}
          />
          <br />
          <LandOwnership
            expanded={landOwnershipOpen}
            onExpandedChange={setLandOwnershipOpen}
            property={property}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handleLandOwnershipOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
      {property?.props?.ownRealState === 'No' && (
        <>
          <RentPayment
            expanded={rentPaymentOpen}
            onExpandedChange={setRentPaymentOpen}
            property={property}
            reviewedSections={reviewedSections}
            setReviewedSections={setReviewedSections}
            onReview={handlerentPaymentOnReview}
            submitted={submitted}
          />
          <br />
        </>
      )}
    </>
  );
}

PropertySection.propTypes = {
  landOwnershipOpen: PropTypes.bool,
  setLandOwnershipOpen: PropTypes.func,
  handleLandOwnershipOnReview: PropTypes.func,
  mortgageOpen: PropTypes.bool,
  setMortgageOpen: PropTypes.func,
  handleMortgageOnReview: PropTypes.func,
  realStateOwnershipOpen: PropTypes.bool,
  setRealStateOwnershipOpen: PropTypes.func,
  handleRealStateOwnershipOnReview: PropTypes.func,
  rentPaymentOpen: PropTypes.bool,
  setRentPaymentOpen: PropTypes.func,
  handlerentPaymentOnReview: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  submitted: PropTypes.bool,
};
