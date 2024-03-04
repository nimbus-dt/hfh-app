import { Alert, Button, Flex } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import { calculateAgeInMonths } from 'utils/dates';
import CustomCard from 'components/CustomCard';
import { useApplicantInfosQuery } from 'hooks/services';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';
import BusinessOwnerOrSelfEmployed from './components/BusinessOwnerOrSelfEmployed';

export default function HomeownershipEmploymentPage() {
  const [employmentInfo, setEmploymentInfo] = useState();

  const [unemploymentOpen, setUnemploymentOpen] = useState(true);
  const [unemploymentEdit, setUnemploymentEdit] = useState(false);

  const [businessOwnerOrSelfEmployedOpen, setBusinessOwnerOrSelfEmployedOpen] =
    useState(false);
  const [businessOwnerOrSelfEmployedEdit, setBusinessOwnerOrSelfEmployedEdit] =
    useState(false);

  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [currentEmploymentEdit, setCurrentEmploymentEdit] = useState(false);

  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);
  const [previousEmploymentEdit, setPreviousEmploymentEdit] = useState(false);

  const [coApplicantUnemploymentOpen, setCoApplicantUnemploymentOpen] =
    useState(false);
  const [coApplicantUnemploymentEdit, setCoApplicantUnemploymentEdit] =
    useState(false);

  const [
    coApplicantBusinessOwnerOrSelfEmployedOpen,
    setCoApplicantBusinessOwnerOrSelfEmployedOpen,
  ] = useState(false);
  const [
    coApplicantBusinessOwnerOrSelfEmployedEdit,
    setCoApplicantBusinessOwnerOrSelfEmployedEdit,
  ] = useState(false);

  const [
    coApplicantCurrentEmploymentOpen,
    setCoApplicantCurrentEmploymentOpen,
  ] = useState(false);
  const [
    coApplicantCurrentEmploymentEdit,
    setCoApplicantCurrentEmploymentEdit,
  ] = useState(false);

  const [
    coApplicantPreviousEmploymentOpen,
    setCoApplicantPreviousEmploymentOpen,
  ] = useState(false);
  const [
    coApplicantPreviousEmploymentEdit,
    setCoApplicantPreviousEmploymentEdit,
  ] = useState(false);

  const { application, updateApplicationLastSection, habitat } =
    useOutletContext();

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  });

  const onValidCurrentlyUnemployed = async (data) => {
    try {
      if (employmentInfo === undefined) {
        const persistedEmploymentInfo = await DataStore.save(
          new EmploymentInfo({
            ownerID: application.id,
            props: data,
          })
        );
        setCurrentEmploymentOpen(true);
        setEmploymentInfo(persistedEmploymentInfo);
      } else {
        const original = await DataStore.query(
          EmploymentInfo,
          employmentInfo.id
        );
        const persistedEmploymentInfo = await DataStore.save(
          EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
            originalEmploymentInfo.ownerID = application.id;
            originalEmploymentInfo.props = {
              ...originalEmploymentInfo.props,
              currentlyUnemployed: data.currentlyUnemployed,
              businessOwnerOrSelfEmployed:
                data.currentlyUnemployed === 'Yes'
                  ? undefined
                  : originalEmploymentInfo.props.businessOwnerOrSelfEmployed,
              currentEmployment:
                data.currentlyUnemployed === 'Yes'
                  ? undefined
                  : originalEmploymentInfo.props.currentEmployment,
              previousEmployment:
                data.currentlyUnemployed === 'Yes'
                  ? undefined
                  : originalEmploymentInfo.props.previousEmployment,
            };
          })
        );
        setEmploymentInfo(persistedEmploymentInfo);
        setUnemploymentEdit(false);
      }

      setAlert(
        createAlert(
          'success',
          'Success',
          'The unemployment status was saved successfully.'
        )
      );

      setUnemploymentOpen(false);

      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's unemployment status couldn't be saved."
        )
      );
    }
  };

  const handleOnClickUnemploymentEdit = () =>
    setUnemploymentEdit(
      (previousUnemploymentEdit) => !previousUnemploymentEdit
    );

  const onValidBusinessOwnerOrSelfEmployed = async (data) => {
    try {
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            businessOwnerOrSelfEmployed: data,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setBusinessOwnerOrSelfEmployedEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The business owner or self employed info was saved successfully.'
        )
      );

      setCurrentEmploymentOpen(true);
      setBusinessOwnerOrSelfEmployedOpen(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The business owner or self employed couldn't be saved."
        )
      );
    }
  };

  const handleOnClickBusinessOwnerOrSelfEmployedEdit = () =>
    setBusinessOwnerOrSelfEmployedEdit(
      (previousBusinessOwnerOrSelfEmployedEdit) =>
        !previousBusinessOwnerOrSelfEmployedEdit
    );

  const onValidCurrentEmployment = async (data) => {
    try {
      const { employerCity, ...newData } = data;

      newData.employerCity = employerCity.selectedCity.label;
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            previousEmployment:
              calculateAgeInMonths(data.startDate) >=
              habitat?.props.homeownershipMinCurrentEmploymentMonths
                ? undefined
                : original.props.previousEmployment,
            currentEmployment: newData,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setCurrentEmploymentEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The current employment information was saved successfully.'
        )
      );

      if (
        calculateAgeInMonths(data.startDate) <
        habitat?.props.homeownershipMinCurrentEmploymentMonths
      ) {
        setPreviousEmploymentOpen(true);
      }

      setCurrentEmploymentOpen(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The current employment couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCurrentEmploymentEdit = () =>
    setCurrentEmploymentEdit(
      (previousCurrentEmploymentEdit) => !previousCurrentEmploymentEdit
    );

  const onValidPreviousEmployment = async (data) => {
    try {
      const { employerCity, ...newData } = data;

      newData.employerCity = employerCity.selectedCity.label;
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            previousEmployment: newData,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setPreviousEmploymentEdit(false);
      setPreviousEmploymentOpen(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The previous employment information was saved successfully.'
        )
      );
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The previous employment couldn't be saved."
        )
      );
    }
  };

  const handleOnClickPreviousEmploymentEdit = () =>
    setPreviousEmploymentEdit(
      (previousPreviousEmploymentEdit) => !previousPreviousEmploymentEdit
    );

  const onValidCoApplicantCurrentlyUnemployed = async (data) => {
    try {
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.ownerID = application.id;
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            coApplicantCurrentlyUnemployed: data.currentlyUnemployed,
            coApplicantBusinessOwnerOrSelfEmployed:
              data.currentlyUnemployed === 'Yes'
                ? undefined
                : originalEmploymentInfo.props
                    .coApplicantBusinessOwnerOrSelfEmployed,
            coApplicantCurrentEmployment:
              data.currentlyUnemployed === 'Yes'
                ? undefined
                : originalEmploymentInfo.props.coApplicantCurrentEmployment,
            coApplicantPreviousEmployment:
              data.currentlyUnemployed === 'Yes'
                ? undefined
                : originalEmploymentInfo.props.coApplicantPreviousEmployment,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setCoApplicantUnemploymentEdit(false);

      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's unemployment status was saved successfully."
        )
      );

      setCoApplicantUnemploymentOpen(false);
      if (data.currentlyUnemployed === 'No') {
        setCoApplicantCurrentEmploymentOpen(true);
      }

      updateApplicationLastSection();
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's unemployment status couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantUnemploymentEdit = () =>
    setCoApplicantUnemploymentEdit(
      (previousCoApplicantUnemploymentEdit) =>
        !previousCoApplicantUnemploymentEdit
    );

  const onValidCoApplicantBusinessOwnerOrSelfEmployed = async (data) => {
    try {
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            coApplicantBusinessOwnerOrSelfEmployed: data,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setCoApplicantBusinessOwnerOrSelfEmployedEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's business owner or self employed info was saved successfully."
        )
      );

      setCoApplicantCurrentEmploymentOpen(true);
      setCoApplicantBusinessOwnerOrSelfEmployedOpen(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's business owner or self employed couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantBusinessOwnerOrSelfEmployedEdit = () =>
    setCoApplicantBusinessOwnerOrSelfEmployedEdit(
      (previousCoApplicantBusinessOwnerOrSelfEmployedEdit) =>
        !previousCoApplicantBusinessOwnerOrSelfEmployedEdit
    );

  const onValidCoApplicantCurrentEmployment = async (data) => {
    try {
      const { employerCity, ...newData } = data;

      newData.employerCity = employerCity.selectedCity.label;
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            coApplicantPreviousEmployment:
              calculateAgeInMonths(data.startDate) >=
              habitat?.props.homeownershipMinCurrentEmploymentMonths
                ? undefined
                : original.props.coApplicantPreviousEmployment,
            coApplicantCurrentEmployment: newData,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setCoApplicantCurrentEmploymentEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's current employment information was saved successfully."
        )
      );

      if (
        calculateAgeInMonths(data.startDate) <
        habitat?.props.homeownershipMinCurrentEmploymentMonths
      ) {
        setCoApplicantPreviousEmploymentOpen(true);
      }

      setCoApplicantCurrentEmploymentOpen(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's current employment couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantCurrentEmploymentEdit = () =>
    setCoApplicantCurrentEmploymentEdit(
      (previousCoApplicantCurrentEmploymentEdit) =>
        !previousCoApplicantCurrentEmploymentEdit
    );

  const onValidCoApplicantPreviousEmployment = async (data) => {
    try {
      const { employerCity, ...newData } = data;

      newData.employerCity = employerCity.selectedCity.label;
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            coApplicantPreviousEmployment: newData,
          };
        })
      );
      setEmploymentInfo(persistedEmploymentInfo);
      setCoApplicantPreviousEmploymentEdit(false);
      setCoApplicantPreviousEmploymentOpen(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          "The co-applicant's previous employment information was saved successfully."
        )
      );
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's previous employment couldn't be saved."
        )
      );
    }
  };

  const handleOnClickCoApplicantPreviousEmploymentEdit = () =>
    setCoApplicantPreviousEmploymentEdit(
      (previousCoApplicantPreviousEmploymentEdit) =>
        !previousCoApplicantPreviousEmploymentEdit
    );

  const handleOnClickNext = () => navigate('../property');

  const isNextDisabled = () => {
    if (
      employmentInfo !== undefined &&
      employmentInfo.props.currentlyUnemployed &&
      (applicantInfos[0]?.props?.hasCoApplicant === 'Yes'
        ? employmentInfo.props.coApplicantCurrentlyUnemployed
        : true)
    ) {
      if (
        employmentInfo?.props?.currentlyUnemployed === 'No' &&
        (employmentInfo.props.businessOwnerOrSelfEmployed === undefined ||
          employmentInfo?.props?.currentEmployment === undefined)
      ) {
        return true;
      }
      if (
        calculateAgeInMonths(
          employmentInfo?.props?.currentEmployment?.startDate
        ) < habitat?.props.homeownershipMinCurrentEmploymentMonths &&
        employmentInfo?.props?.currentEmployment?.firstJob === 'No' &&
        employmentInfo.props.previousEmployment === undefined
      ) {
        return true;
      }

      if (
        applicantInfos[0]?.props?.hasCoApplicant === 'Yes' &&
        employmentInfo?.props?.coApplicantCurrentlyUnemployed === 'No' &&
        (employmentInfo?.props?.coApplicantCurrentEmployment === undefined ||
          employmentInfo.props.coApplicantBusinessOwnerOrSelfEmployed ===
            undefined)
      ) {
        return true;
      }
      if (
        applicantInfos[0]?.props?.hasCoApplicant === 'Yes' &&
        calculateAgeInMonths(
          employmentInfo?.props?.coApplicantCurrentEmployment?.startDate
        ) < habitat?.props.homeownershipMinCurrentEmploymentMonths &&
        employmentInfo?.props?.coApplicantCurrentEmployment?.firstJob ===
          'No' &&
        employmentInfo.props.coApplicantPreviousEmployment === undefined
      ) {
        return true;
      }

      return false;
    }
    return true;
  };

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
      <Unemployment
        expanded={unemploymentOpen}
        onExpandedChange={setUnemploymentOpen}
        employmentInfo={employmentInfo}
        onValid={onValidCurrentlyUnemployed}
        edit={unemploymentEdit}
        onClickEdit={handleOnClickUnemploymentEdit}
      />
      <br />
      {employmentInfo?.props?.currentlyUnemployed === 'No' && (
        <>
          <BusinessOwnerOrSelfEmployed
            expanded={businessOwnerOrSelfEmployedOpen}
            onExpandedChange={setBusinessOwnerOrSelfEmployedOpen}
            employmentInfo={employmentInfo}
            onValid={onValidBusinessOwnerOrSelfEmployed}
            edit={businessOwnerOrSelfEmployedEdit}
            onClickEdit={handleOnClickBusinessOwnerOrSelfEmployedEdit}
          />
          <br />
          <CurrentEmployment
            expanded={currentEmploymentOpen}
            onExpandedChange={setCurrentEmploymentOpen}
            employmentInfo={employmentInfo}
            onValid={onValidCurrentEmployment}
            edit={currentEmploymentEdit}
            onClickEdit={handleOnClickCurrentEmploymentEdit}
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
              onValid={onValidPreviousEmployment}
              edit={previousEmploymentEdit}
              onClickEdit={handleOnClickPreviousEmploymentEdit}
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
            onValid={onValidCoApplicantCurrentlyUnemployed}
            edit={coApplicantUnemploymentEdit}
            onClickEdit={handleOnClickCoApplicantUnemploymentEdit}
            coApplicant
          />
          <br />
          {employmentInfo?.props?.coApplicantCurrentlyUnemployed === 'No' && (
            <>
              <BusinessOwnerOrSelfEmployed
                expanded={coApplicantBusinessOwnerOrSelfEmployedOpen}
                onExpandedChange={setCoApplicantBusinessOwnerOrSelfEmployedOpen}
                employmentInfo={employmentInfo}
                onValid={onValidCoApplicantBusinessOwnerOrSelfEmployed}
                edit={coApplicantBusinessOwnerOrSelfEmployedEdit}
                onClickEdit={
                  handleOnClickCoApplicantBusinessOwnerOrSelfEmployedEdit
                }
                coApplicant
              />
              <br />
              <CurrentEmployment
                expanded={coApplicantCurrentEmploymentOpen}
                onExpandedChange={setCoApplicantCurrentEmploymentOpen}
                employmentInfo={employmentInfo}
                onValid={onValidCoApplicantCurrentEmployment}
                edit={coApplicantCurrentEmploymentEdit}
                onClickEdit={handleOnClickCoApplicantCurrentEmploymentEdit}
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
                  onValid={onValidCoApplicantPreviousEmployment}
                  edit={coApplicantPreviousEmploymentEdit}
                  onClickEdit={handleOnClickCoApplicantPreviousEmploymentEdit}
                  coApplicant
                />
                <br />
              </>
            )}
        </>
      )}
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Link to="../homeowners">
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
