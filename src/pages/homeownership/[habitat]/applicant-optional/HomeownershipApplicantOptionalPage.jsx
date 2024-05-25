import { Alert, Button, Flex, View } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { ApplicantOptional } from 'models';
import { DataStore } from 'aws-amplify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { createAlert } from 'utils/factories';
import CustomCard from 'components/CustomCard';
import { useApplicantInfosQuery } from 'hooks/services';
import ApplicantMilitaryServiceSection from './components/ApplicantMilitaryServiceSection';
import AnyoneElseMilitaryServiceSection from './components/AnyoneElseMilitaryServiceSection';
import DemographicSection from './components/DemographicSection';

export default function HomeownershipApplicantOptionalPage() {
  const { application, updateApplicationLastSection, habitat } =
    useOutletContext();

  const shouldRenderCoApplicant = false;

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  });

  const hasCoapplicant = applicantInfos[0]?.props?.hasCoApplicant === 'Yes';

  const [optional, setOptional] = useState();

  const [applicantMilitaryServiceOpen, setApplicantMilitaryServiceOpen] =
    useState(true);
  const [applicantMilitaryServiceEdit, setApplicantMilitaryServiceEdit] =
    useState(false);

  const [anyoneElseMilitaryServiceOpen, setAnyoneElseMilitaryServiceOpen] =
    useState(false);
  const [anyoneElseMilitaryServiceEdit, setAnyoneElseMilitaryServiceEdit] =
    useState(false);

  const [demographicOpen, setDemographicOpen] = useState(false);
  const [demographicEdit, setDemographicEdit] = useState(false);

  const [coApplicantDemographicOpen, setCoApplicantDemographicOpen] =
    useState(false);
  const [coApplicantDemographicEdit, setCoApplicantDemographicEdit] =
    useState(false);

  const [alert, setAlert] = useState();
  const navigate = useNavigate();

  const onValidApplicantMilitaryService = async (data) => {
    try {
      if (optional === undefined) {
        const persistedApplicantOptional = await DataStore.save(
          new ApplicantOptional({
            ownerID: application.id,
            props: {
              applicantMilitaryService: data,
            },
          })
        );
        setOptional(persistedApplicantOptional);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The applicant military service information was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantOptional, optional.id);
        const persistedApplicantOptional = await DataStore.save(
          ApplicantOptional.copyOf(original, (originalApplicantOptional) => {
            originalApplicantOptional.ownerID = application.id;
            originalApplicantOptional.props = {
              ...originalApplicantOptional.props,
              applicantMilitaryService: data,
            };
          })
        );
        setOptional(persistedApplicantOptional);
        setApplicantMilitaryServiceEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The applicant military service information was updated successfully.'
          )
        );
      }

      setApplicantMilitaryServiceOpen(false);
      setAnyoneElseMilitaryServiceOpen(true);
      updateApplicationLastSection();
    } catch (error) {
      console.log('error', error);
      setAlert(
        createAlert(
          'error',
          'Error',
          "The applicant military service information couldn't be saved."
        )
      );
    }
  };

  const onValidAnyoneElseMilitaryService = async (data) => {
    try {
      if (optional === undefined) {
        const persistedApplicantOptional = await DataStore.save(
          new ApplicantOptional({
            ownerID: application.id,
            props: {
              anyoneElseMilitaryService: data,
            },
          })
        );
        setOptional(persistedApplicantOptional);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The household member military service information was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantOptional, optional.id);
        const persistedApplicantOptional = await DataStore.save(
          ApplicantOptional.copyOf(original, (originalApplicantOptional) => {
            originalApplicantOptional.ownerID = application.id;
            originalApplicantOptional.props = {
              ...originalApplicantOptional.props,
              anyoneElseMilitaryService: data,
            };
          })
        );
        setOptional(persistedApplicantOptional);
        setAnyoneElseMilitaryServiceEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The household member military service information was updated successfully.'
          )
        );
      }

      setAnyoneElseMilitaryServiceOpen(false);
      setDemographicOpen(true);
      updateApplicationLastSection();
    } catch (error) {
      console.log('error', error);
      setAlert(
        createAlert(
          'error',
          'Error',
          "The household member military service information couldn't be saved."
        )
      );
    }
  };

  const onValidDemographic = async (data) => {
    try {
      if (optional === undefined) {
        const persistedApplicantOptional = await DataStore.save(
          new ApplicantOptional({
            ownerID: application.id,
            props: {
              demographic: data,
            },
          })
        );
        setOptional(persistedApplicantOptional);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The demographic information was saved successfully.'
          )
        );
      } else {
        const original = await DataStore.query(ApplicantOptional, optional.id);
        const persistedApplicantOptional = await DataStore.save(
          ApplicantOptional.copyOf(original, (originalApplicantOptional) => {
            originalApplicantOptional.ownerID = application.id;
            originalApplicantOptional.props = {
              ...originalApplicantOptional.props,
              demographic: data,
            };
          })
        );
        setOptional(persistedApplicantOptional);
        setDemographicEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            'The demographic information was updated successfully.'
          )
        );
      }

      setDemographicOpen(false);
      if (hasCoapplicant) {
        setCoApplicantDemographicOpen(true);
      }
      updateApplicationLastSection();
    } catch (error) {
      console.log('error', error);
      setAlert(
        createAlert(
          'error',
          'Error',
          "The demographic information couldn't be saved."
        )
      );
    }
  };

  const onValidCoApplicantDemographic = async (data) => {
    try {
      if (optional === undefined) {
        const persistedApplicantOptional = await DataStore.save(
          new ApplicantOptional({
            ownerID: application.id,
            props: {
              coApplicantDemographic: data,
            },
          })
        );
        setOptional(persistedApplicantOptional);
        setAlert(
          createAlert(
            'success',
            'Success',
            "The co-applicant's demographic information was saved successfully."
          )
        );
      } else {
        const original = await DataStore.query(ApplicantOptional, optional.id);
        const persistedApplicantOptional = await DataStore.save(
          ApplicantOptional.copyOf(original, (originalApplicantOptional) => {
            originalApplicantOptional.ownerID = application.id;
            originalApplicantOptional.props = {
              ...originalApplicantOptional.props,
              coApplicantDemographic: data,
            };
          })
        );
        setOptional(persistedApplicantOptional);
        setCoApplicantDemographicEdit(false);
        setAlert(
          createAlert(
            'success',
            'Success',
            "The co-applicant's demographic information was updated successfully."
          )
        );
      }

      setCoApplicantDemographicOpen(false);
      updateApplicationLastSection();
    } catch (error) {
      console.log('error', error);
      setAlert(
        createAlert(
          'error',
          'Error',
          "The co-applicant's demographic information couldn't be saved."
        )
      );
    }
  };

  const handleOnClickApplicantMilitaryServiceEdit = () =>
    setApplicantMilitaryServiceEdit(
      (previousApplicantMilitaryServiceEdit) =>
        !previousApplicantMilitaryServiceEdit
    );

  const handleOnClickAnyoneElseMilitaryServiceEdit = () =>
    setAnyoneElseMilitaryServiceEdit(
      (previousAnyoneElseMilitaryServiceEdit) =>
        !previousAnyoneElseMilitaryServiceEdit
    );

  const handleOnClickDemographicEdit = () =>
    setDemographicEdit((previousDemographicEdit) => !previousDemographicEdit);

  const handleOnClickCoApplicantDemographicEdit = () =>
    setCoApplicantDemographicEdit(
      (previousCoApplicantDemographicEdit) =>
        !previousCoApplicantDemographicEdit
    );

  const handleOnClickNext = () => {
    navigate('../checklist');
  };

  useEffect(() => {
    const getApplicationOptional = async (applicationID) => {
      try {
        const existingApplicantOptional = await DataStore.query(
          ApplicantOptional,
          (c) => c.ownerID.eq(applicationID)
        );
        setOptional(existingApplicantOptional[0]);
      } catch (error) {
        console.log('Error fetching the applicant optional info data.');
      }
    };
    if (application) {
      getApplicationOptional(application.id);
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
        <ApplicantMilitaryServiceSection
          expanded={applicantMilitaryServiceOpen}
          onExpandedChange={setApplicantMilitaryServiceOpen}
          applicantOptional={optional}
          onValid={onValidApplicantMilitaryService}
          edit={applicantMilitaryServiceEdit}
          onClickEdit={handleOnClickApplicantMilitaryServiceEdit}
        />
        <br />
        <AnyoneElseMilitaryServiceSection
          expanded={anyoneElseMilitaryServiceOpen}
          onExpandedChange={setAnyoneElseMilitaryServiceOpen}
          applicantOptional={optional}
          onValid={onValidAnyoneElseMilitaryService}
          edit={anyoneElseMilitaryServiceEdit}
          onClickEdit={handleOnClickAnyoneElseMilitaryServiceEdit}
        />
        <br />
        <DemographicSection
          expanded={demographicOpen}
          onExpandedChange={setDemographicOpen}
          applicantOptional={optional}
          onValid={onValidDemographic}
          edit={demographicEdit}
          onClickEdit={handleOnClickDemographicEdit}
        />
        <br />
        {hasCoapplicant && shouldRenderCoApplicant && (
          <>
            <DemographicSection
              expanded={coApplicantDemographicOpen}
              onExpandedChange={setCoApplicantDemographicOpen}
              applicantOptional={optional}
              onValid={onValidCoApplicantDemographic}
              edit={coApplicantDemographicEdit}
              onClickEdit={handleOnClickCoApplicantDemographicEdit}
              coApplicant
            />
            <br />
          </>
        )}
        <CustomCard>
          <Flex width="100%" justifyContent="space-between">
            <Button
              variation="primary"
              onClick={() => navigate('../applicant-info')}
            >
              Back
            </Button>
            <Button variation="primary" onClick={handleOnClickNext}>
              Next
            </Button>
          </Flex>
        </CustomCard>
      </Flex>
    </View>
  );
}
