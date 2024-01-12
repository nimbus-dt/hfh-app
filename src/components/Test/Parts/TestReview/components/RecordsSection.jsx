import { Flex, Button, View } from '@aws-amplify/ui-react';
import { useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Record } from 'models';
import FileInput from 'components/FileInput';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import LoadingData from './LoadingData';

const RecordsSection = () => {
  const [records, setRecords] = useState();

  const [expanded, setExpanded] = useState(false);

  const { habitat, application } = useOutletContext();

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  useEffect(() => {
    const getRecords = async (applicationID) => {
      try {
        const existingRecords = await DataStore.query(Record, (c) =>
          c.ownerID.eq(applicationID)
        );

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
        setRecords(newFormValues);
      } catch (error) {
        console.log('Error fetching the records data.');
      }
    };
    if (application) {
      getRecords(application.id);
    }
  }, [application]);
  return (
    <>
      <CustomExpandableCard
        title="Records"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        {records ? (
          <>
            {habitat?.props?.prePreScreen?.prePreScreenRecords.map((record) => (
              <View key={record.name}>
                <FileInput
                  label={record.label}
                  files={records && records[record.name]}
                  isDisabled
                />

                <br />
              </View>
            ))}
            <Flex width="100%" justifyContent="end">
              <Button variation="primary">Edit</Button>
            </Flex>
          </>
        ) : (
          <LoadingData />
        )}
      </CustomExpandableCard>
      <br />
    </>
  );
};

export default RecordsSection;
