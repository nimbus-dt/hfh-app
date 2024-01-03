import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import { useState } from 'react';
import { EmploymentInfo } from 'models';
import { DataStore } from 'aws-amplify';
import { Link, useNavigate } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import { calculateAge } from 'utils/dates';
import { CustomCard } from '../../Reusable/CustomCard';
import Unemployment from './components/Unemployment';
import CurrentEmployment from './components/CurrentEmployment';
import PreviousEmployment from './components/PreviousEmployment';

export function TestEmployment() {
  const [employmentInfo, setEmploymentInfo] = useState();

  const [unemploymentOpen, setUnemploymentOpen] = useState(true);
  const [unemploymentEdit, setUnemploymentEdit] = useState(false);

  const [currentEmploymentOpen, setCurrentEmploymentOpen] = useState(false);
  const [currentEmploymentEdit, setCurrentEmploymentEdit] = useState(false);

  const [previousEmploymentOpen, setPreviousEmploymentOpen] = useState(false);
  const [previousEmploymentEdit, setPreviousEmploymentEdit] = useState(false);

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const onValidCurrentlyUnemployed = async (data) => {
    try {
      if (employmentInfo === undefined) {
        const persistedEmploymentInfo = await DataStore.save(
          new EmploymentInfo({
            props: data,
          })
        );
        console.log('persistedEmploymentInfo', persistedEmploymentInfo);
        setCurrentEmploymentOpen(true);
        setEmploymentInfo(persistedEmploymentInfo);
      } else {
        const original = await DataStore.query(
          EmploymentInfo,
          employmentInfo.id
        );
        const persistedEmploymentInfo = await DataStore.save(
          EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
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
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            previousEmployment:
              calculateAge(data.startDate) >= 1
                ? undefined
                : original.props.previousEmployment,
            currentEmployment: data,
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

      if (calculateAge(data.startDate) < 1) {
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
      const original = await DataStore.query(EmploymentInfo, employmentInfo.id);
      const persistedEmploymentInfo = await DataStore.save(
        EmploymentInfo.copyOf(original, (originalEmploymentInfo) => {
          originalEmploymentInfo.props = {
            ...originalEmploymentInfo.props,
            previousEmployment: data,
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

  const handleOnClickNext = () => {};

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
        calculateAge(employmentInfo?.props?.currentEmployment?.startDate) < 1 &&
        employmentInfo.props.previousEmployment === undefined
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

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
        {calculateAge(employmentInfo?.props?.currentEmployment?.startDate) <
          1 && (
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
    </View>
  );
}
