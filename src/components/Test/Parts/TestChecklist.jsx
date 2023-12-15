import {
  Flex,
  Button,
  RadioGroupField,
  Radio,
  Alert,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checklist } from 'models';
import { createAlert } from 'utils/factories';
import { CustomCard } from '../Reusable/CustomCard';
import { CustomExpandableCard } from '../Reusable/CustomExpandableCard';
import { checklistSchema } from './checklist.schema';

export function TestChecklist() {
  const [checklist, setChecklist] = useState();
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [alert, setAlert] = useState();
  const [habitat] = useOutletContext();
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(checklistSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: checklist?.props,
  });

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const onValidSubmit = async (data) => {
    try {
      if (checklist) {
        const original = await DataStore.query(Checklist, checklist.id);
        const persistedChecklist = await DataStore.save(
          Checklist.copyOf(original, (originalChecklist) => {
            originalChecklist.props = data;
          })
        );
        setChecklist(persistedChecklist);
      } else {
        const persistedChecklist = await DataStore.save(
          new Checklist({ props: data })
        );
        setChecklist(persistedChecklist);
      }
      setEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The checklist questions were saved successfully.'
        )
      );
      setExpanded(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The checklist questions couldn't be saved."
        )
      );
    }
  };

  const handleOnClickNext = () => {
    navigate('../written');
  };

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = checklist === undefined || edit;
  return (
    <Flex direction="column" alignItems="center">
      {alert && (
        <Alert
          variation={alert.variation}
          heading={alert.heading}
          onDismiss={() => setAlert()}
          isDismissible
          hasIcon
        >
          {alert.body}
        </Alert>
      )}
      <CustomExpandableCard
        title="Checklist"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {habitat?.props?.prePreScreen?.prePreScreenQuestions.map(
            (question) => (
              <Controller
                key={question.name}
                control={control}
                name={question.name}
                defaultValue={null}
                render={({ field: { onChange, onBlur, value } }) => (
                  <RadioGroupField
                    name={question.name}
                    label={question.label}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    value={value}
                    isRequired
                    defaultChecked={false}
                    isDisabled={!isEnabled}
                  >
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </RadioGroupField>
                )}
              />
            )
          )}
          <Flex width="100%" justifyContent="end">
            {checklist ? (
              <Button onClick={handleOnClickEdit} variation="secondary">
                {edit ? 'Cancel' : 'Edit'}
              </Button>
            ) : null}
            {isEnabled ? (
              <Button type="submit" variation="primary">
                Save
              </Button>
            ) : null}
          </Flex>
        </form>
      </CustomExpandableCard>
      <CustomCard>
        <Flex width="100%" justifyContent="space-between">
          <Button
            variation="primary"
            onClick={() => navigate('../applicant-info')}
          >
            Back
          </Button>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={checklist === undefined}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
