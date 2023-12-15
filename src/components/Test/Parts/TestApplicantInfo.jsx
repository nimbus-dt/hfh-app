import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { ApplicantInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import {
  BasicInformation,
  Address,
  PrevAddress,
} from '../FormComponents/FormApplicantInfo';
import { CustomCard } from '../Reusable/CustomCard';

export function TestApplicantInfo() {
  const [applicantInfo, setApplicantInfo] = useState();

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [basicInfoEdit, setBasicInfoEdit] = useState(false);

  const [currentAddressOpen, setCurrentAddressOpen] = useState(false);
  const [currentAddressEdit, setCurrentAddressEdit] = useState(false);

  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);
  const [previousAddressEdit, setPreviousAddressEdit] = useState(false);

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const onValidBasicInfo = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            props: {
              basicInfo: data,
            },
          })
        );
        setCurrentAddressOpen(true);
        setApplicantInfo(persistedApplicantInfo);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The basic information was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
        const persistedApplicantInfo = await DataStore.save(
          ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              basicInfo: { ...data },
            };
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setBasicInfoEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The basic information was updated successfully.'
          )
        );
      }

      setBasicInfoOpen(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The basic information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickBasicInfoEdit = () =>
    setBasicInfoEdit((previousBasicInfoEdit) => !previousBasicInfoEdit);

  const onValidCurrentAddress = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            props: {
              currentAddress: data,
            },
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The current address was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
        const persistedApplicantInfo = await DataStore.save(
          ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              previousAddress:
                data.monthsLivedHere >= 24
                  ? undefined
                  : original.props.previousAddress,
              currentAddress: { ...data },
            };
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setCurrentAddressEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The current address was updated successfully.'
          )
        );
      }
      setPreviousAddressOpen(true);
      setCurrentAddressOpen(false);
    } catch {
      setAlert(
        createAlert('error', 'Error', "The current address couldn't be saved.")
      );
    }
  };

  const handleOnClickCurrentAddressEdit = () =>
    setCurrentAddressEdit(
      (previousCurrentAddressEdit) => !previousCurrentAddressEdit
    );

  const onValidPreviousAddress = async (data) => {
    try {
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            previousAddress: { ...data },
          };
        })
      );
      setApplicantInfo(persistedApplicantInfo);
      setPreviousAddressEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The previous address was saved successfully.'
        )
      );

      setPreviousAddressOpen(false);
    } catch {
      setAlert(
        createAlert('error', 'Error', "The previous address couldn't be saved.")
      );
    }
  };

  const handleOnClickPreviousAddressEdit = () =>
    setPreviousAddressEdit(
      (previousPreviousAddressEdit) => !previousPreviousAddressEdit
    );

  const handleOnClickNext = () => {
    navigate('../checklist');
  };

  const isNextDisabled = () => {
    if (
      applicantInfo !== undefined &&
      applicantInfo?.props?.basicInfo !== undefined &&
      applicantInfo?.props?.currentAddress !== undefined
    ) {
      if (
        applicantInfo.props.currentAddress.monthsLivedHere < 24 &&
        applicantInfo.props.previousAddress === undefined
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  return (
    <View as="div">
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
      <BasicInformation
        expanded={basicInfoOpen}
        onExpandedChange={setBasicInfoOpen}
        applicantInfo={applicantInfo}
        onValid={onValidBasicInfo}
        edit={basicInfoEdit}
        onClickEdit={handleOnClickBasicInfoEdit}
      />
      <br />
      <Address
        expanded={currentAddressOpen}
        onExpandedChange={setCurrentAddressOpen}
        applicantInfo={applicantInfo}
        onValid={onValidCurrentAddress}
        edit={currentAddressEdit}
        onClickEdit={handleOnClickCurrentAddressEdit}
      />
      <br />
      {applicantInfo?.props?.currentAddress?.monthsLivedHere < 24 && (
        <>
          <PrevAddress
            expanded={previousAddressOpen}
            onExpandedChange={setPreviousAddressOpen}
            applicantInfo={applicantInfo}
            onValid={onValidPreviousAddress}
            edit={previousAddressEdit}
            onClickEdit={handleOnClickPreviousAddressEdit}
          />
          <br />
        </>
      )}
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Button variation="primary" onClick={() => navigate('../terms')}>
            Back
          </Button>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={isNextDisabled()}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </View>
  );
}
