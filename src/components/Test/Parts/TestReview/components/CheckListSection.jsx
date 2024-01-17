import {
  Flex,
  Button,
  RadioGroupField,
  Radio,
  View,
} from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { DataStore } from 'aws-amplify';
import { Checklist } from 'models';
import { CustomExpandableCard } from 'components/Test/Reusable/CustomExpandableCard';
import PropTypes from 'prop-types';
import { getCheckOrExEmoji } from 'utils/misc';
import LoadingData from './LoadingData';

export function ChecklistSection({
  expanded,
  setExpanded,
  reviewedSections,
  setReviewedSections,
  onReview,
}) {
  const [checklist, setChecklist] = useState();

  const { habitat, application } = useOutletContext();

  const customCardReference = useRef(null);

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

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      checklist: false,
    }));
  }, [setReviewedSections]);

  useEffect(() => {
    if (expanded) {
      customCardReference.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [expanded]);

  return (
    <>
      <CustomExpandableCard
        title={`${getCheckOrExEmoji(reviewedSections.checklist)} Checklist`}
        expanded={expanded}
        onExpandedChange={setExpanded}
        ref={customCardReference}
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
}

ChecklistSection.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
};
