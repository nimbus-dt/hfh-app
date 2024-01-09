import { Flex, Button, Alert, TextAreaField } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import { DataStore } from 'aws-amplify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Written } from 'models';
import { createAlert } from 'utils/factories';
import { CustomCard } from '../../Reusable/CustomCard';
import { CustomExpandableCard } from '../../Reusable/CustomExpandableCard';
import { writtenSchema } from './written.schema';

export function TestWritten() {
  const [writtenQuestions, setWrittenQuestions] = useState();
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [alert, setAlert] = useState();
  const [habitat] = useOutletContext();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(writtenSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
    values: writtenQuestions?.props,
  });

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const onValidSubmit = async (data) => {
    try {
      if (writtenQuestions) {
        const original = await DataStore.query(Written, writtenQuestions.id);
        const persistedWritten = await DataStore.save(
          Written.copyOf(original, (originalWritten) => {
            originalWritten.props = data;
          })
        );
        setWrittenQuestions(persistedWritten);
      } else {
        const persistedWritten = await DataStore.save(
          new Written({ props: data })
        );
        setWrittenQuestions(persistedWritten);
      }
      setEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The written questions were saved successfully.'
        )
      );
      setExpanded(false);
    } catch {
      setAlert(
        createAlert(
          'error',
          'Error',
          "The written questions couldn't be saved."
        )
      );
    }
  };

  const handleOnClickNext = () => navigate('../records');

  const handleOnClickEdit = () => setEdit((previousEdit) => !previousEdit);

  const isEnabled = writtenQuestions === undefined || edit;
  return (
    <Flex direction="column" alignItems="center" width="100%">
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
        title={`${
          writtenQuestions !== undefined ? '✔️' : '❌'
        } Written Response`}
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {habitat?.props?.prePreScreen?.prePreScreenWrittenQuestions.map(
            (writtenQuestion) => (
              <TextAreaField
                {...register(writtenQuestion.name)}
                key={writtenQuestion.name}
                label={writtenQuestion.label}
                placeholder={writtenQuestion.placeholder}
                type="text"
                hasError={errors[writtenQuestion.name] !== undefined}
                errorMessage={errors[writtenQuestion.name]?.message}
                isRequired
                isDisabled={!isEnabled}
                marginBottom="1rem"
              />
            )
          )}
          <Flex width="100%" justifyContent="end">
            {writtenQuestions ? (
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
          <Button variation="primary" onClick={() => navigate('../checklist')}>
            Back
          </Button>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={writtenQuestions === undefined}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
