import { Flex, Button, TextAreaField } from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Written } from 'models';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import LoadingData from './LoadingData';

const WrittenSection = () => {
  const [writtenQuestions, setWrittenQuestions] = useState();

  const [expanded, setExpanded] = useState(false);

  const { habitat, application } = useOutletContext();

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  useEffect(() => {
    const getWritten = async (applicationID) => {
      try {
        const existingWritten = await DataStore.query(Written, (c) =>
          c.ownerID.eq(applicationID)
        );
        setWrittenQuestions(existingWritten[0]);
      } catch (error) {
        console.log('Error fetching the written questions data.');
      }
    };
    if (application) {
      getWritten(application.id);
    }
  }, [application]);

  return (
    <>
      <CustomExpandableCard
        title="Written Response"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        {writtenQuestions ? (
          <>
            {habitat?.props?.prePreScreen?.prePreScreenWrittenQuestions.map(
              (writtenQuestion) => (
                <TextAreaField
                  key={writtenQuestion.name}
                  label={writtenQuestion.label}
                  value={writtenQuestions?.props[writtenQuestion.name] || ''}
                  isDisabled
                  marginBottom="1rem"
                />
              )
            )}
            <Flex width="100%" justifyContent="end">
              <Link to="../written">
                <Button variation="primary">Edit</Button>
              </Link>
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

export default WrittenSection;
