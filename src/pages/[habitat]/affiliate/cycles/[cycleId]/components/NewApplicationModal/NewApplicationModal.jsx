import { useTranslation } from 'react-i18next';
import {
  Alert,
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
import {
  TestApplication,
  SubmissionStatus,
  ApplicationTypes,
  ReviewStatus,
} from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import { stringToHumanReadable } from 'utils/strings';
import useHabitat from 'hooks/utils/useHabitat';
import { newPaperApplicationSchema } from './NewApplicationModal.schema';

const NewApplicationModal = ({ open, onClose, setTrigger, cycle }) => {
  const { t } = useTranslation();
  const { habitat } = useHabitat();
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
        `application/${habitat?.urlName}/${cycle.id}/${applicationId}/${file.name}`,
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
            paperApplicationKeys: [],
          },
          submittedDate: data.submittedDate,
          reviewStatus: data.reviewStatus,
          submissionStatus: SubmissionStatus.COMPLETED,
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
      title={t('components.newApplicationModal.title')}
      open={open}
      onClickClose={() => loading === 0 && onClose()}
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
          {t('components.newApplicationModal.error')}
        </Alert>
      )}
      <Text>{t('components.newApplicationModal.description')}</Text>
      <br />
      <form onSubmit={handleSubmit(handleOnValid)}>
        <Flex direction="column">
          <TextField
            {...register('name')}
            label={t('components.newApplicationModal.name.label')}
            descriptiveText={t(
              'components.newApplicationModal.name.descriptiveText'
            )}
            errorMessage={t('components.newApplicationModal.name.error')}
            hasError={errors.name}
            isRequired
            disabled={loading > 0}
          />
          <TextField
            {...register('submittedDate')}
            type="date"
            label={t('components.newApplicationModal.date.label')}
            errorMessage={t('components.newApplicationModal.date.error')}
            hasError={errors.date}
            isRequired
            disabled={loading > 0}
          />
          <SelectField
            {...register('reviewStatus')}
            label={t('components.newApplicationModal.reviewStatus.label')}
            errorMessage={t(
              'components.newApplicationModal.reviewStatus.error'
            )}
            hasError={errors.reviewStatus}
            isRequired
            disabled={loading > 0}
          >
            <option value={ReviewStatus.PENDING}>
              {t('components.newApplicationModal.reviewStatus.pending')}
            </option>
            <option value={ReviewStatus.ACCEPTED}>
              {t('components.newApplicationModal.reviewStatus.accepted')}
            </option>
            <option value={ReviewStatus.DENIED}>
              {t('components.newApplicationModal.reviewStatus.denied')}
            </option>
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
                  label={t(
                    'components.newApplicationModal.uploadApplication.label'
                  )}
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
              <Text>{t('components.newApplicationModal.uploading')}</Text>
              <Loader variation="linear" />
            </Flex>
          )}
          <Flex justifyContent="end">
            <CustomButton
              variation="secondary"
              onClick={() => loading === 0 && onClose()}
              disabled={loading > 0}
            >
              {t('components.newApplicationModal.cancel')}
            </CustomButton>
            <CustomButton
              variation="primary"
              type="submit"
              disabled={loading > 0}
            >
              {t('components.newApplicationModal.submit')}
            </CustomButton>
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
  cycle: PropTypes.object,
};

export default NewApplicationModal;
