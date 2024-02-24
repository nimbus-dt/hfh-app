import { Alert, Button, Flex } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import { calculateAgeInMonths } from 'utils/dates';
import CustomCard from 'components/CustomCard';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';

export default function HomeownershipEmploymentPage() {
  const [employmentInfo, setEmploymentInfo] = useState();

  const [unemploymentOpen, setUnemploymentOpen] = useState(true);
  const [unemploymentEdit, setUnemploymentEdit] = useState(false);

  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [currentEmploymentEdit, setCurrentEmploymentEdit] = useState(false);

  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);
  const [previousEmploymentEdit, setPreviousEmploymentEdit] = useState(false);

  const { application, updateApplicationLastSection, habitat } =
    useOutletContext();

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

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
          "The basic information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickUnemploymentEdit = () =>
    setUnemploymentEdit(
      (previousUnemploymentEdit) => !previousUnemploymentEdit
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
        createAlert('error', 'Error', "The current address couldn't be saved.")
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
        createAlert('error', 'Error', "The previous address couldn't be saved.")
      );
    }
  };

  const handleOnClickPreviousEmploymentEdit = () =>
    setPreviousEmploymentEdit(
      (previousPreviousEmploymentEdit) => !previousPreviousEmploymentEdit
    );

  const handleOnClickNext = () => navigate('../financial');

  const isNextDisabled = () => {
    if (
      employmentInfo !== undefined &&
      employmentInfo.props.currentlyUnemployed
    ) {
      if (
        employmentInfo?.props?.currentlyUnemployed === 'No' &&
        employmentInfo?.props?.currentEmployment === undefined
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
