import { Flex, Button, View } from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Record } from 'models';
import FileInput from 'components/FileInput';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import PropTypes from 'prop-types';
import { getCheckOrExEmoji } from 'utils/misc';
import LoadingData from './LoadingData';

const RecordsSection = ({
  reviewedSections,
  setReviewedSections,
  expanded,
  setExpanded,
  onReview,
}) => {
  const [records, setRecords] = useState();

  const customCardReference = useRef(null);

  const { habitat, application } = useOutletContext();

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

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      records: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [expanded]);
  return (
    <>
      <CustomExpandableCard
        title={`${getCheckOrExEmoji(reviewedSections.records)} Records`}
        expanded={expanded}
        onExpandedChange={setExpanded}
        ref={customCardReference}
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
              <Link to="../records">
                <Button>Edit</Button>
              </Link>
              <Button onClick={onReview} variation="primary">
                Confirm
              </Button>
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

RecordsSection.propTypes = {
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  onReview: PropTypes.func,
};

export default RecordsSection;
