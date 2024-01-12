import {
  Flex,
  Button,
  RadioGroupField,
  Radio,
  View,
} from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Checklist } from 'models';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import LoadingData from './LoadingData';

export function ChecklistSection() {
  const [checklist, setChecklist] = useState();
  const [expanded, setExpanded] = useState(false);

  const { habitat, application } = useOutletContext();

  const handleOnExpandedChange = (newExpanded) => setExpanded(newExpanded);

  useEffect(() => {
    const getChecklist = async (applicationID) => {
      try {
        const existingChecklist = await DataStore.query(Checklist, (c) =>
          c.ownerID.eq(applicationID)
        );
        setChecklist(existingChecklist[0]);
      } catch (error) {
        console.log('Error fetching the checklist data.');
      }
    };
    if (application) {
      getChecklist(application.id);
    }
  }, [application]);

  return (
    <>
      <CustomExpandableCard
        title="Checklist"
        expanded={expanded}
        onExpandedChange={handleOnExpandedChange}
      >
        {checklist ? (
          <>
            {habitat?.props?.prePreScreen?.prePreScreenQuestions.map(
              (question) => (
                <View key={question.name}>
                  <RadioGroupField
                    label={question.label}
                    value={checklist?.props[question.name] || ''}
                    isDisabled
                  >
                    <Radio value="Yes">Yes</Radio>
                    <Radio value="No">No</Radio>
                  </RadioGroupField>

                  <br />
                </View>
              )
            )}
            <Flex width="100%" justifyContent="end">
              <Link to="../checklist">
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
}
