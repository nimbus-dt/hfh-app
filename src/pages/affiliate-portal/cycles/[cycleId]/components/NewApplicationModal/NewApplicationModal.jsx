import {
  Alert,
  Button,
  Flex,
  Loader,
  SelectField,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import Modal from 'components/Modal';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileInput from 'components/FileInput';
import { DataStore, Storage } from 'aws-amplify';
import { TestApplication, SubmissionStatus, ApplicationTypes } from 'models';
import { newPaperApplicationSchema } from './NewApplicationModal.schema';

const NewApplicationModal = ({ open, onClose, setTrigger, habitat, cycle }) => {
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(0);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(newPaperApplicationSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const uploadFiles = async (applicationId, files) => {
    const promisesArr = files.map((file) =>
      Storage.put(
        `application/${habitat?.urlName}/${cycle?.id}/${applicationId}/${file.name}`,
        file,
        {
          level: 'public',
        }
      )
    );

    const results = await Promise.all(promisesArr);

    return results;
  };

  const handleOnValid = async (data) => {
    setLoading((previousLoading) => previousLoading + 1);
    try {
      const newApplication = await DataStore.save(
        new TestApplication({
          props: {
            name: data.name,
          },
          submittedDate: data.submittedDate,
          reviewStatus: data.reviewStatus,
          submissionStatus: SubmissionStatus.SUBMITTED,
          testcycleID: cycle.id,
          type: ApplicationTypes.PAPER,
        })
      );

      const results = await uploadFiles(newApplication.id, data.application);
      const resultsArray = results.map((result) => result.key);

      const applicationToUpdate = await DataStore.query(
        TestApplication,
        newApplication.id
      );

      await DataStore.save(
        TestApplication.copyOf(
          applicationToUpdate,
          (originalTestApplication) => {
            originalTestApplication.props = {
              ...originalTestApplication.props,
              paperApplicationKeys: resultsArray,
            };
          }
        )
      );

      setTrigger((prevTrigger) => prevTrigger + 1);

      reset();

      onClose();
    } catch (error) {
      setShowError(true);
      console.log(error);
    }
    setLoading((previousLoading) => previousLoading - 1);
  };

  return (
    <Modal
      title="New Paper Application"
      open={open}
      onClickClose={onClose}
      width="35rem"
    >
      {showError && (
        <Alert
          variation="error"
          heading="Error"
          isDismissible
          onDismiss={() => setShowError()}
          marginBottom="1rem"
        >
          Couldn't save the new application.
        </Alert>
      )}
      <Text>
        By creating a paper application record, you are creating a record that
        tracks the information of an application you have received on paper,
        physically. Please make sure that you enter data correctly, as once you
        have added an application you can not edit this information.
      </Text>
      <br />
      <form onSubmit={handleSubmit(handleOnValid)}>
        <Flex direction="column">
          <TextField
            {...register('name')}
            label="Name"
            descriptiveText="Name of the main applicant in the application"
            errorMessage="Invalid name"
            hasError={errors.name}
            isRequired
            disabled={loading > 0}
          />
          <TextField
            {...register('submittedDate')}
            type="date"
            label="Date submitted"
            errorMessage="Invalid date"
            hasError={errors.date}
            isRequired
            disabled={loading > 0}
          />
          <SelectField
            {...register('reviewStatus')}
            label="Review status"
            errorMessage="Invalid review status"
            hasError={errors.reviewStatus}
            isRequired
            disabled={loading > 0}
          >
            {habitat.props.data.customStatus?.map((statusItem) => (
              <option key={statusItem} value={statusItem}>
                {statusItem}
              </option>
            ))}
          </SelectField>
          <Controller
            control={control}
            name="application"
            defaultValue={[]}
            render={({ field: { onChange, value } }) => {
              const handleOnChange = (newFiles) => {
                onChange(newFiles);
              };
              return (
                <FileInput
                  label="Upload application"
                  onChange={handleOnChange}
                  isRequired
                  files={value}
                  disabled={loading > 0}
                />
              );
            }}
          />
          {loading > 0 && (
            <Flex direction="column">
              <Text>Uploading new application</Text>
              <Loader variation="linear" />
            </Flex>
          )}
          <Flex justifyContent="end">
            <Button onClick={onClose} disabled={loading > 0}>
              Cancel
            </Button>
            <Button type="submit" variation="primary" disabled={loading > 0}>
              Submit
            </Button>
          </Flex>
        </Flex>
      </form>
    </Modal>
  );
};

NewApplicationModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  setTrigger: PropTypes.func,
  habitat: PropTypes.object,
  cycle: PropTypes.object,
};

export default NewApplicationModal;
