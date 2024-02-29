import { Alert, Button, Flex } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Property } from 'models';
import { DataStore } from 'aws-amplify';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import CustomCard from 'components/CustomCard';
import RealStateOwnership from './components/RealStateOwnership';
import MortagePayment from './components/MortagePayment';
import RentPayment from './components/RentPayment';
import LandOwnership from './components/LandOwnership';

export default function HomeownershipPropertyPage() {
  const [property, setProperty] = useState();

  const [ownRealStateOpen, setOwnRealStateOpen] = useState(true);
  const [ownRealStateEdit, setOwnRealStateEdit] = useState(false);

  const [mortagePaymentOpen, setMortagePaymentOpen] = useState(false);
  const [mortagePaymentEdit, setMortagePaymentEdit] = useState(false);

  const [rentPaymentOpen, setRentPaymentOpen] = useState(false);
  const [rentPaymentEdit, setRentPaymentEdit] = useState(false);

  const [landOwnershipOpen, setLandOwnershipOpen] = useState(false);
  const [landOwnershipEdit, setLandOwnershipEdit] = useState(false);

  const { application, updateApplicationLastSection } = useOutletContext();

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const onValidRealStateOwnership = async (data) => {
    try {
      if (property === undefined) {
        const persistedProperty = await DataStore.save(
          new Property({
            ownerID: application.id,
            props: data,
          })
        );
        setMortagePaymentOpen(true);
        setProperty(persistedProperty);
      } else {
        const original = await DataStore.query(Property, property.id);
        const persistedProperty = await DataStore.save(
          Property.copyOf(original, (originalProperty) => {
            originalProperty.ownerID = application.id;
            originalProperty.props = {
              ...originalProperty.props,
              ownRealState: data.ownRealState,
              mortagePayment:
                data.ownRealState === 'No'
                  ? undefined
                  : originalProperty.props.mortagePayment,
              landOwnership:
                data.ownRealState === 'No'
                  ? undefined
                  : originalProperty.props.mortagePayment,
              rentPayment:
                data.ownRealState === 'Yes'
                  ? undefined
                  : originalProperty.props.rentPayment,
            };
          })
        );
        setProperty(persistedProperty);
        setOwnRealStateEdit(false);
      }

      setAlert(
        createAlert(
          'success',
          'Success',
          'The real state ownership was saved successfully.'
        )
      );

      if (data.ownRealState === 'Yes') {
        setMortagePaymentOpen(true);
      } else {
        setRentPaymentOpen(true);
      }

      setOwnRealStateOpen(false);

      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The real state ownership couldn't be saved."
        )
      );
    }
  };

  const handleOnClickRealStateOwnershipEdit = () =>
    setOwnRealStateEdit(
      (previousOwnRealStateEdit) => !previousOwnRealStateEdit
    );

  const onValidMortagePayment = async (data) => {
    try {
      const original = await DataStore.query(Property, property.id);
      const persistedProperty = await DataStore.save(
        Property.copyOf(original, (originalProperty) => {
          originalProperty.props = {
            ...originalProperty.props,
            mortagePayment: data,
          };
        })
      );
      setProperty(persistedProperty);
      setMortagePaymentEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The mortage payment was saved successfully.'
        )
      );

      setLandOwnershipOpen(true);

      setMortagePaymentOpen(false);
    } catch {
      setAlert(
        createAlert('error', 'Error', "The mortage payment couldn't be saved.")
      );
    }
  };

  const handleOnClickMortagePaymentEdit = () =>
    setMortagePaymentEdit(
      (previousMortagePaymentEdit) => !previousMortagePaymentEdit
    );

  const onValidRentPayment = async (data) => {
    try {
      const original = await DataStore.query(Property, property.id);
      const persistedProperty = await DataStore.save(
        Property.copyOf(original, (originalProperty) => {
          originalProperty.props = {
            ...originalProperty.props,
            rentPayment: data,
          };
        })
      );
      setProperty(persistedProperty);
      setRentPaymentEdit(false);
      setRentPaymentOpen(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The rent payment was saved successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert('error', 'Error', "The rent payment couldn't be saved.")
      );
    }
  };

  const handleOnClickRentPaymentEdit = () =>
    setRentPaymentEdit((previousrentPaymentEdit) => !previousrentPaymentEdit);

  const onValidLandOwnership = async (data) => {
    try {
      const original = await DataStore.query(Property, property.id);
      const persistedProperty = await DataStore.save(
        Property.copyOf(original, (originalProperty) => {
          originalProperty.ownerID = application.id;
          originalProperty.props = {
            ...originalProperty.props,
            landOwnership: data,
          };
        })
      );
      setProperty(persistedProperty);
      setLandOwnershipEdit(false);

      setAlert(
        createAlert(
          'success',
          'Success',
          'The land ownership was saved successfully.'
        )
      );

      setLandOwnershipOpen(false);

      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert('error', 'Error', "The land ownership couldn't be saved.")
      );
    }
  };

  const handleOnClickLandOwnershipEdit = () =>
    setLandOwnershipEdit(
      (previousLandOwnershipEdit) => !previousLandOwnershipEdit
    );

  const handleOnClickNext = () => navigate('../financial');

  const isNextDisabled = () => {
    if (property !== undefined && property.props.ownRealState) {
      if (
        (property.props.ownRealState === 'Yes' &&
          (property?.props?.mortagePayment === undefined ||
            property?.props?.landOwnership === undefined)) ||
        (property.props.ownRealState === 'No' &&
          property?.props?.rentPayment === undefined)
      ) {
        return true;
      }

      return false;
    }
    return true;
  };

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
    <Flex direction="column" gap="unset" alignItems="center" width="100%">
      {alert && (
        <Alert
          variation={alert.variation}
          heading={alert.heading}
          marginBottom="20px"
          onDismiss={() => setAlert()}
          isDismissible
          hasIcon
        >
          {alert.body}
        </Alert>
      )}
      <RealStateOwnership
        expanded={ownRealStateOpen}
        onExpandedChange={setOwnRealStateOpen}
        property={property}
        onValid={onValidRealStateOwnership}
        edit={ownRealStateEdit}
        onClickEdit={handleOnClickRealStateOwnershipEdit}
      />
      <br />
      {property?.props?.ownRealState === 'Yes' && (
        <>
          <MortagePayment
            expanded={mortagePaymentOpen}
            onExpandedChange={setMortagePaymentOpen}
            property={property}
            onValid={onValidMortagePayment}
            edit={mortagePaymentEdit}
            onClickEdit={handleOnClickMortagePaymentEdit}
          />
          <br />
          <LandOwnership
            expanded={landOwnershipOpen}
            onExpandedChange={setLandOwnershipOpen}
            property={property}
            onValid={onValidLandOwnership}
            edit={landOwnershipEdit}
            onClickEdit={handleOnClickLandOwnershipEdit}
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
            onValid={onValidRentPayment}
            edit={rentPaymentEdit}
            onClickEdit={handleOnClickRentPaymentEdit}
          />
          <br />
        </>
      )}

      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Link to="../employment">
            <Button variation="primary">Back</Button>
          </Link>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={isNextDisabled()}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
