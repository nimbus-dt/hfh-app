import { Flex, Button, Alert, View, Text, Loader } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore, Storage } from 'aws-amplify';
import { Controller, useForm } from 'react-hook-form';
import { Record } from 'models';
import { createAlert } from 'utils/factories';
import { zodResolver } from '@hookform/resolvers/zod';
import FileInput from 'components/FileInput';
import CustomCard from 'components/CustomCard';
import CustomExpandableCard from 'components/CustomExpandableCard';
import { recordsSchema } from './HomeownershipRecordsPage.schema';

export default function HomeownershipRecordsPage() {
  const [records, setRecords] = useState();
  const [edit, setEdit] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [alert, setAlert] = useState();
  const { habitat, application, updateApplicationLastSection } =
    useOutletContext();
  const [loading, setLoading] = useState(false);
  const [persistedValues, setPersistedValues] = useState();
  const navigate = useNavigate();
  const { handleSubmit, control, reset } = useForm({
    resolver: zodResolver(recordsSchema),
    shouldFocusError: false,
    reValidateMode: 'onBlur',
  });

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  const uploadFiles = async (files, recordName) => {
    const promisesArr = files.map((file) =>
      Storage.put(
        `records/${habitat?.urlName}/${application.id}/${recordName}/${file.name}`,
        file,
        {
          level: 'public',
        }
      )
    );

    const results = await Promise.all(promisesArr);

    return results;
  };

  const removeFiles = async (keys) => {
    const promisesArr = keys.map((key) =>
      Storage.remove(key, {
        level: 'public',
      })
    );
    const results = await Promise.all(promisesArr);
    return results;
  };

  const onValidSubmit = async (data) => {
    setPersistedValues(data);
    setLoading(true);
    const resultsObj = {};
    for (const [key, value] of Object.entries(data)) {
      const results = await uploadFiles(value, key);
      resultsObj[key] = results.map((result) => result.key);
    }
    try {
      if (records) {
        const original = await DataStore.query(Record, records.id);

        for (const [key, value] of Object.entries(resultsObj)) {
          const filesToRemove = original.props[key].filter(
            (s3key) => !value.includes(s3key)
          );
          if (filesToRemove.length > 0) {
            await removeFiles(filesToRemove);
          }
        }

        const persistedRecord = await DataStore.save(
          Record.copyOf(original, (originalRecord) => {
            originalRecord.ownerID = application.id;
            originalRecord.props = resultsObj;
          })
        );

        setRecords(persistedRecord);
      } else {
        const persistedRecord = await DataStore.save(
          new Record({ ownerID: application.id, props: resultsObj })
        );
        setRecords(persistedRecord);
      }
      setEdit(false);
      setAlert(
        createAlert(
          'success',
          'Success',
          'The records were saved successfully.'
        )
      );
      setExpanded(false);
      updateApplicationLastSection();
    } catch (error) {
      setAlert(createAlert('error', 'Error', "The records couldn't be saved."));
    }
    setLoading(false);
  };

  const handleOnClickNext = () => navigate('../homeowners');

  const handleOnClickEdit = () => {
    reset(persistedValues);
    setEdit((previousEdit) => !previousEdit);
  };

  const isEnabled = records === undefined || edit;

  useEffect(() => {
    const getRecords = async (applicationID) => {
      try {
        const existingRecords = await DataStore.query(Record, (c) =>
          c.ownerID.eq(applicationID)
        );
        setRecords(existingRecords[0]);

        const newFormValues = {};

        for (const [key, filesKeys] of Object.entries(
          existingRecords[0].props
        )) {
          const filesArray = filesKeys.map((fileKey) => {
            const pathArray = fileKey.split('/');
            return new File([''], pathArray[pathArray.length - 1]);
          });
          newFormValues[key] = filesArray;
        }
        reset(newFormValues);
      } catch (error) {
        console.log('Error fetching the records data.');
      }
    };
    if (application) {
      getRecords(application.id);
    }
  }, [application]);
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
        title={`${records !== undefined ? '✔️' : '❌'} Records`}
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        <form onSubmit={handleSubmit(onValidSubmit)}>
          {habitat?.props.homeownershipRecordQuestions.map((record) => (
            <View key={record.name}>
              <Controller
                control={control}
                name={record.name}
                defaultValue={[]}
                render={({ field: { onChange, value } }) => {
                  const handleOnChange = (newFiles) => {
                    onChange(newFiles);
                  };
                  return (
                    <FileInput
                      label={record.label}
                      onChange={handleOnChange}
                      isRequired
                      files={value}
                      accept={record.acceptedFileTypes.join(', ')}
                      isDisabled={!isEnabled}
                      maxFileCount={record.max}
                    />
                  );
                }}
              />

              <br />
            </View>
          ))}
          {loading && (
            <View>
              <Text>Uploading files</Text>
              <Loader variation="linear" />
            </View>
          )}
          <Flex width="100%" justifyContent="end">
            {records ? (
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
          <Button variation="primary" onClick={() => navigate('../written')}>
            Back
          </Button>
          <Button
            variation="primary"
            onClick={handleOnClickNext}
            isDisabled={records === undefined}
          >
            Next
          </Button>
        </Flex>
      </CustomCard>
    </Flex>
  );
}
