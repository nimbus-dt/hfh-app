import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { ApplicantInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import CustomCard from 'components/CustomCard';
import {
  BasicInformation,
  Address,
  PrevAddress,
  UnmarriedAddendum,
} from './components/FormApplicantInfo';
import { maritalStatusValues } from './aplicantInfo.schema';

export function TestApplicantInfo() {
  const { application, updateApplicationLastSection, habitat } =
    useOutletContext();

  const [applicantInfo, setApplicantInfo] = useState();

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [basicInfoEdit, setBasicInfoEdit] = useState(false);

  const [unmarriedAddendumOpen, setUnmarriedAddendumOpen] = useState(false);
  const [unmarriedAddendumEdit, setUnmarriedAddendumEdit] = useState(false);

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
            ownerID: application.id,
            props: {
              basicInfo: data,
            },
          })
        );
        if (data.maritalStatus === maritalStatusValues[2]) {
          setUnmarriedAddendumOpen(true);
        } else {
          setCurrentAddressOpen(true);
        }
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
            originalApplicantInfo.ownerID = application.id;
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              basicInfo: { ...data },

              unmarriedAddendum:
                data.maritalStatus === maritalStatusValues[2]
                  ? originalApplicantInfo.unmarriedAddendum
                  : undefined,
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
      updateApplicationLastSection();
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

  const onValidUnmarriedAddendum = async (data) => {
    try {
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);

      const newUnmarriedAddendum = {
        ...data,
        otherRelationshipType:
          data.relationshipType === 'Other'
            ? data.otherRelationshipType
            : undefined,
      };

      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.ownerID = application.id;
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            unmarriedAddendum: newUnmarriedAddendum,
          };
        })
      );
      setApplicantInfo(persistedApplicantInfo);
      setUnmarriedAddendumEdit(false);
      setCurrentAddressOpen(true);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The unmarried addendum information was saved successfully.'
        )
      );

      setUnmarriedAddendumOpen(false);
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The unmarried addendum information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickUnmarriedAddendumEdit = () =>
    setUnmarriedAddendumEdit(
      (previousUnmarriedAddendumEdit) => !previousUnmarriedAddendumEdit
    );

  const onValidCurrentAddress = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            ownerID: application.id,
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
            originalApplicantInfo.ownerID = application.id;
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              previousAddress:
                data.monthsLivedHere >=
                habitat?.props.homeownershipMinCurrentAddressMonths
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
      updateApplicationLastSection();
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
          originalApplicantInfo.ownerID = application.id;
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
      updateApplicationLastSection();
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
    navigate('../applicant-optional');
  };

  const isNextDisabled = () => {
    if (
      applicantInfo !== undefined &&
      applicantInfo?.props?.basicInfo !== undefined &&
      applicantInfo?.props?.currentAddress !== undefined
    ) {
      if (
        applicantInfo.props.basicInfo.maritalStatus ===
          maritalStatusValues[2] &&
        applicantInfo.props.unmarriedAddendum === undefined
      ) {
        return true;
      }
      if (
        applicantInfo.props.currentAddress.monthsLivedHere <
          habitat?.props.homeownershipMinCurrentAddressMonths &&
        applicantInfo.props.previousAddress === undefined
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

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

  return (
    <View as="div">
      <Flex direction="column" gap="unset" alignItems="center">
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
        {applicantInfo?.props?.basicInfo?.maritalStatus ===
          maritalStatusValues[2] && (
          <>
            <UnmarriedAddendum
              expanded={unmarriedAddendumOpen}
              onExpandedChange={setUnmarriedAddendumOpen}
              applicantInfo={applicantInfo}
              onValid={onValidUnmarriedAddendum}
              edit={unmarriedAddendumEdit}
              onClickEdit={handleOnClickUnmarriedAddendumEdit}
            />
            <br />
          </>
        )}
        <Address
          expanded={currentAddressOpen}
          onExpandedChange={setCurrentAddressOpen}
          applicantInfo={applicantInfo}
          onValid={onValidCurrentAddress}
          edit={currentAddressEdit}
          onClickEdit={handleOnClickCurrentAddressEdit}
        />
        <br />
        {applicantInfo?.props?.currentAddress?.monthsLivedHere <
          habitat?.props.homeownershipMinCurrentAddressMonths && (
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
      </Flex>
    </View>
  );
}
