import { Flex, Button, TextAreaField } from '@aws-amplify/ui-react';
import { Link, useOutletContext } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { DataStore } from 'aws-amplify';
import { Written } from 'models';
import PropTypes from 'prop-types';
import { getCheckOrExEmoji } from 'utils/misc';
import CustomExpandableCard from 'components/CustomExpandableCard';
import LoadingData from './LoadingData';

const WrittenSection = ({
  expanded,
  setExpanded,
  reviewedSections,
  setReviewedSections,
  onReview,
  submitted,
}) => {
  const [writtenQuestions, setWrittenQuestions] = useState();

  const customCardReference = useRef(null);

  const { habitat, application } = useOutletContext();

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

  useEffect(() => {
    setReviewedSections((previousReviewedSections) => ({
      ...previousReviewedSections,
      written: false,
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
        title={`${getCheckOrExEmoji(
          reviewedSections.written || submitted
        )} Written Response`}
        expanded={expanded}
        onExpandedChange={setExpanded}
        ref={customCardReference}
      >
        {writtenQuestions ? (
          <>
            {habitat?.props.homeownershipWrittenQuestions.map(
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
            {!submitted && (
              <Flex width="100%" justifyContent="end">
                <Link to="../written">
                  <Button>Edit</Button>
                </Link>
                <Button onClick={onReview} variation="primary">
                  Confirm
                </Button>
              </Flex>
            )}
          </>
        ) : (
          <LoadingData />
        )}
      </CustomExpandableCard>

      <br />
    </>
  );
};

WrittenSection.propTypes = {
  expanded: PropTypes.bool,
  setExpanded: PropTypes.func,
  reviewedSections: PropTypes.object,
  setReviewedSections: PropTypes.func,
  onReview: PropTypes.func,
  submitted: PropTypes.bool,
};

export default WrittenSection;
