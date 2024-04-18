import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { ApplicantInfo, Member } from 'models';
import { DataStore } from 'aws-amplify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import CustomCard from 'components/CustomCard';
import { maritalStatusValues } from './HomeownershipApplicantInfoPage.schema';
import BasicInformation from './components/BasicInformation';
import UnmarriedAddendum from './components/UnmarriedAddendum';
import Address from './components/Address';
import PrevAddress from './components/PrevAddress';
import TypeOfCredit from './components/TypeOfCredit';
import CoApplicant from './components/CoApplicant';
import TypeOfOwnership from './components/TypeOfOwnership';

export default function HomeownershipApplicantInfoPage() {
  const { application, updateApplicationLastSection, habitat } =
    useOutletContext();

  const shouldRenderCoApplicant = habitat?.props.optionalSections.coApplicant;

  const shouldRenderTypeOfOwnership =
    habitat?.props.optionalSections.typeOfOwnership;

  const [applicantInfo, setApplicantInfo] = useState();

  const [basicInfoOpen, setBasicInfoOpen] = useState(true);
  const [basicInfoEdit, setBasicInfoEdit] = useState(false);

  const [unmarriedAddendumOpen, setUnmarriedAddendumOpen] = useState(false);
  const [unmarriedAddendumEdit, setUnmarriedAddendumEdit] = useState(false);

  const [currentAddressOpen, setCurrentAddressOpen] = useState(false);
  const [currentAddressEdit, setCurrentAddressEdit] = useState(false);

  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);
  const [previousAddressEdit, setPreviousAddressEdit] = useState(false);

  const [typeOfCreditOpen, setTypeOfCreditOpen] = useState(false);
  const [typeOfCreditEdit, setTypeOfCreditEdit] = useState(false);

  const [typeOfOwnershipOpen, setTypeOfOwnershipOpen] = useState(false);
  const [typeOfOwnershipEdit, setTypeOfOwnershipEdit] = useState(false);

  const [coApplicantOpen, setCoApplicantOpen] = useState(false);
  const [coApplicantEdit, setCoApplicantEdit] = useState(false);

  const [coApplicantBasicInfoOpen, setCoApplicantBasicInfoOpen] =
    useState(false);
  const [coApplicantBasicInfoEdit, setCoApplicantBasicInfoEdit] =
    useState(false);

  const [
    coApplicantUnmarriedAddendumOpen,
    setCoApplicantUnmarriedAddendumOpen,
  ] = useState(false);
  const [
    coApplicantUnmarriedAddendumEdit,
    setCoApplicantUnmarriedAddendumEdit,
  ] = useState(false);

  const [coApplicantCurrentAddressOpen, setCoApplicantCurrentAddressOpen] =
    useState(false);
  const [coApplicantCurrentAddressEdit, setCoApplicantCurrentAddressEdit] =
    useState(false);

  const [coApplicantPreviousAddressOpen, setCoApplicantPreviousAddressOpen] =
    useState(false);
  const [coApplicantPreviousAddressEdit, setCoApplicantPreviousAddressEdit] =
    useState(false);

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { city, ...newData } = data;

      newData.city = data.city.selectedCity.label;
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            ownerID: application.id,
            props: {
              currentAddress: newData,
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
              currentAddress: newData,
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
      if (
        data.monthsLivedHere <
        habitat?.props.homeownershipMinCurrentAddressMonths
      ) {
        setPreviousAddressOpen(true);
      } else if (shouldRenderCoApplicant) {
        setTypeOfCreditOpen(true);
      } else {
        setTypeOfOwnershipOpen(true);
      }
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { city, ...newData } = data;

      newData.city = data.city.selectedCity.label;
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.ownerID = application.id;
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            previousAddress: newData,
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
      if (shouldRenderCoApplicant) {
        setTypeOfCreditOpen(true);
      } else {
        setTypeOfOwnershipOpen(true);
      }
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

  const onValidTypeOfCredit = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            ownerID: application.id,
            props: {
              typeOfCredit: data,
            },
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The type of credit was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
        const persistedApplicantInfo = await DataStore.save(
          ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
            originalApplicantInfo.ownerID = application.id;
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              typeOfCredit: { ...data },
            };
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setTypeOfCreditEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The type of credit was updated successfully.'
          )
        );
      }
      setTypeOfCreditOpen(false);
      if (shouldRenderTypeOfOwnership) {
        setTypeOfOwnershipOpen(true);
      } else {
        setCoApplicantOpen(true);
      }
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert('error', 'Error', "The type of credit couldn't be saved.")
      );
    }
  };

  const handleOnClickTypeOfCreditEdit = () =>
    setTypeOfCreditEdit(
      (previousTypeOfCreditEdit) => !previousTypeOfCreditEdit
    );

  const onValidTypeOfOwnership = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            ownerID: application.id,
            props: {
              typeOfOwnership: data,
            },
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The type of ownership was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
        const persistedApplicantInfo = await DataStore.save(
          ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
            originalApplicantInfo.ownerID = application.id;
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              typeOfOwnership: data,
            };
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setTypeOfOwnershipEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The type of ownership was updated successfully.'
          )
        );
      }
      setTypeOfOwnershipOpen(false);
      setCoApplicantOpen(true);
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The type of ownership couldn't be saved."
        )
      );
    }
  };

  const handleOnClickTypeOfOwnershipEdit = () =>
    setTypeOfOwnershipEdit(
      (previousTypeOfOwnershipEdit) => !previousTypeOfOwnershipEdit
    );

  const onValidCoApplicant = async (data) => {
    try {
      if (applicantInfo === undefined) {
        const persistedApplicantInfo = await DataStore.save(
          new ApplicantInfo({
            ownerID: application.id,
            props: {
              hasCoApplicant: data.hasCoApplicant,
            },
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The co-applicant question was saved successfully.'
          )
        );
        if (data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant) {
          setCoApplicantBasicInfoOpen(true);
        }
      } else {
        const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
        const persistedApplicantInfo = await DataStore.save(
          ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
            originalApplicantInfo.ownerID = application.id;
            originalApplicantInfo.props = {
              ...originalApplicantInfo.props,
              hasCoApplicant: data.hasCoApplicant,
              coApplicantBasicInfo:
                data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant
                  ? originalApplicantInfo.props.coApplicantBasicInfo
                  : undefined,
              coApplicantUnmarriedAddendum:
                data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant
                  ? originalApplicantInfo.props.coApplicantUnmarriedAddendum
                  : undefined,
              coApplicantCurrentAddress:
                data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant
                  ? originalApplicantInfo.props.coApplicantCurrentAddress
                  : undefined,
              coApplicantPreviousAddress:
                data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant
                  ? originalApplicantInfo.props.coApplicantPreviousAddress
                  : undefined,
            };
          })
        );
        setApplicantInfo(persistedApplicantInfo);
        setCoApplicantEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The co-applicant question was updated successfully.'
          )
        );
      }
      setCoApplicantOpen(false);
      if (data.hasCoApplicant === 'Yes' && shouldRenderCoApplicant) {
        setCoApplicantBasicInfoOpen(true);
      } else {
        await DataStore.delete(Member, (c) =>
          c.and((c2) => [
            c2.testapplicationID.eq(application.id),
            c2.isCoApplicant.eq(true),
          ])
        );
      }
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant question couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantEdit = () =>
    setCoApplicantEdit((previousCoApplicantEdit) => !previousCoApplicantEdit);

  const onValidCoApplicantBasicInfo = async (data) => {
    try {
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.ownerID = application.id;
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            coApplicantBasicInfo: { ...data },

            coApplicantUnmarriedAddendum:
              data.maritalStatus === maritalStatusValues[2]
                ? originalApplicantInfo.coApplicantUnmarriedAddendum
                : undefined,
          };
        })
      );
      const persistedMember = await DataStore.query(Member, (c) =>
        c.and((c2) => [
          c2.testapplicationID.eq(application.id),
          c2.isCoApplicant.eq(true),
        ])
      );

      const memberProps = {
        fullName: data.fullName,
        birthDay: data.birthDate,
        sex: data.sex,
        relationship: data.otherRelationship
          ? data.otherRelationship
          : data.relationship,
      };

      if (persistedMember.length > 0) {
        await DataStore.save(
          Member.copyOf(persistedMember[0], (originalMember) => {
            originalMember.props = memberProps;
          })
        );
      } else {
        await DataStore.save(
          new Member({
            testapplicationID: application.id,
            props: memberProps,
            isCoApplicant: true,
          })
        );
      }

      setApplicantInfo(persistedApplicantInfo);
      setCoApplicantBasicInfoEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's basic information was updated successfully."
        )
      );

      setCoApplicantBasicInfoOpen(false);
      if (data.maritalStatus === maritalStatusValues[2]) {
        setCoApplicantUnmarriedAddendumOpen(true);
      } else {
        setCoApplicantCurrentAddressOpen(true);
      }
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's basic information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantBasicInfoEdit = () =>
    setCoApplicantBasicInfoEdit(
      (previousCoApplicantBasicInfoEdit) => !previousCoApplicantBasicInfoEdit
    );

  const onValidCoApplicantUnmarriedAddendum = async (data) => {
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
            coApplicantUnmarriedAddendum: newUnmarriedAddendum,
          };
        })
      );
      setApplicantInfo(persistedApplicantInfo);
      setCoApplicantUnmarriedAddendumEdit(false);
      setCoApplicantCurrentAddressOpen(true);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's unmarried addendum information was saved successfully."
        )
      );

      setCoApplicantUnmarriedAddendumOpen(false);
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's unmarried addendum information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantUnmarriedAddendumEdit = () =>
    setCoApplicantUnmarriedAddendumEdit(
      (previousCoApplicantUnmarriedAddendumEdit) =>
        !previousCoApplicantUnmarriedAddendumEdit
    );

  const onValidCoApplicantCurrentAddress = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { city, ...newData } = data;

      newData.city = data.city.selectedCity.label;
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.ownerID = application.id;
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            coApplicantPreviousAddress:
              data.monthsLivedHere >=
              habitat?.props.homeownershipMinCurrentAddressMonths
                ? undefined
                : original.props.coApplicantPreviousAddress,
            coApplicantCurrentAddress: newData,
          };
        })
      );
      setApplicantInfo(persistedApplicantInfo);
      setCoApplicantCurrentAddressEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's current address was updated successfully."
        )
      );

      if (
        data.monthsLivedHere <
        habitat?.props.homeownershipMinCurrentAddressMonths
      ) {
        setCoApplicantPreviousAddressOpen(true);
      }
      setCoApplicantCurrentAddressOpen(false);
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's current address couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantCurrentAddressEdit = () =>
    setCoApplicantCurrentAddressEdit(
      (previousCoApplicantCurrentAddressEdit) =>
        !previousCoApplicantCurrentAddressEdit
    );

  const onValidCoApplicantPreviousAddress = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { city, ...newData } = data;

      newData.city = data.city.selectedCity.label;
      const original = await DataStore.query(ApplicantInfo, applicantInfo.id);
      const persistedApplicantInfo = await DataStore.save(
        ApplicantInfo.copyOf(original, (originalApplicantInfo) => {
          originalApplicantInfo.ownerID = application.id;
          originalApplicantInfo.props = {
            ...originalApplicantInfo.props,
            coApplicantPreviousAddress: newData,
          };
        })
      );
      setApplicantInfo(persistedApplicantInfo);
      setCoApplicantPreviousAddressEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's previous address was saved successfully."
        )
      );

      setCoApplicantPreviousAddressOpen(false);
      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's previous address couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantPreviousAddressEdit = () =>
    setCoApplicantPreviousAddressEdit(
      (previousCoApplicantPreviousAddressEdit) =>
        !previousCoApplicantPreviousAddressEdit
    );

  const handleOnClickNext = () => {
    navigate('../applicant-optional');
  };

  const isNextDisabled = () => {
    if (
      applicantInfo !== undefined &&
      applicantInfo?.props?.basicInfo !== undefined &&
      applicantInfo?.props?.currentAddress !== undefined &&
      (shouldRenderCoApplicant
        ? applicantInfo?.props?.typeOfCredit !== undefined &&
          applicantInfo?.props?.hasCoApplicant !== undefined
        : true) &&
      (shouldRenderTypeOfOwnership
        ? applicantInfo?.props?.typeOfOwnership !== undefined
        : true) &&
      (applicantInfo?.props?.hasCoApplicant === 'Yes' && shouldRenderCoApplicant
        ? applicantInfo?.props?.coApplicantBasicInfo !== undefined &&
          applicantInfo?.props?.coApplicantCurrentAddress !== undefined
        : true)
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
      if (
        applicantInfo?.props?.hasCoApplicant === 'Yes' &&
        shouldRenderCoApplicant &&
        applicantInfo.props.coApplicantBasicInfo.maritalStatus ===
          maritalStatusValues[2] &&
        applicantInfo.props.coApplicantUnmarriedAddendum === undefined
      ) {
        return true;
      }

      if (
        applicantInfo?.props?.hasCoApplicant === 'Yes' &&
        shouldRenderCoApplicant &&
        applicantInfo.props.coApplicantCurrentAddress.monthsLivedHere <
          habitat?.props.homeownershipMinCurrentAddressMonths &&
        applicantInfo.props.coApplicantPreviousAddress === undefined
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
        {!shouldRenderCoApplicant && shouldRenderTypeOfOwnership && (
          <>
            <TypeOfOwnership
              expanded={typeOfOwnershipOpen}
              onExpandedChange={setTypeOfOwnershipOpen}
              applicantInfo={applicantInfo}
              onValid={onValidTypeOfOwnership}
              edit={typeOfOwnershipEdit}
              onClickEdit={handleOnClickTypeOfOwnershipEdit}
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
              onValid={onValidTypeOfCredit}
              edit={typeOfCreditEdit}
              onClickEdit={handleOnClickTypeOfCreditEdit}
            />
            <br />
            {shouldRenderTypeOfOwnership && (
              <>
                <TypeOfOwnership
                  expanded={typeOfOwnershipOpen}
                  onExpandedChange={setTypeOfOwnershipOpen}
                  applicantInfo={applicantInfo}
                  onValid={onValidTypeOfOwnership}
                  edit={typeOfOwnershipEdit}
                  onClickEdit={handleOnClickTypeOfOwnershipEdit}
                />
                <br />
              </>
            )}
            <CoApplicant
              expanded={coApplicantOpen}
              onExpandedChange={setCoApplicantOpen}
              applicantInfo={applicantInfo}
              onValid={onValidCoApplicant}
              edit={coApplicantEdit}
              onClickEdit={handleOnClickCoApplicantEdit}
            />
            <br />
            {applicantInfo?.props?.hasCoApplicant === 'Yes' &&
              shouldRenderCoApplicant && (
                <>
                  <BasicInformation
                    expanded={coApplicantBasicInfoOpen}
                    onExpandedChange={setCoApplicantBasicInfoOpen}
                    applicantInfo={applicantInfo}
                    onValid={onValidCoApplicantBasicInfo}
                    edit={coApplicantBasicInfoEdit}
                    onClickEdit={handleOnClickCoApplicantBasicInfoEdit}
                    coApplicant
                  />
                  <br />
                  {applicantInfo?.props?.coApplicantBasicInfo?.maritalStatus ===
                    maritalStatusValues[2] && (
                    <>
                      <UnmarriedAddendum
                        expanded={coApplicantUnmarriedAddendumOpen}
                        onExpandedChange={setCoApplicantUnmarriedAddendumOpen}
                        applicantInfo={applicantInfo}
                        onValid={onValidCoApplicantUnmarriedAddendum}
                        edit={coApplicantUnmarriedAddendumEdit}
                        onClickEdit={
                          handleOnClickCoApplicantUnmarriedAddendumEdit
                        }
                        coApplicant
                      />
                      <br />
                    </>
                  )}
                  <Address
                    expanded={coApplicantCurrentAddressOpen}
                    onExpandedChange={setCoApplicantCurrentAddressOpen}
                    applicantInfo={applicantInfo}
                    onValid={onValidCoApplicantCurrentAddress}
                    edit={coApplicantCurrentAddressEdit}
                    onClickEdit={handleOnClickCoApplicantCurrentAddressEdit}
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
                        onValid={onValidCoApplicantPreviousAddress}
                        edit={coApplicantPreviousAddressEdit}
                        onClickEdit={
                          handleOnClickCoApplicantPreviousAddressEdit
                        }
                        coApplicant
                      />
                      <br />
                    </>
                  )}
                </>
              )}
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
