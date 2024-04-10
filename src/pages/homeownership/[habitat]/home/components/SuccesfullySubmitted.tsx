import React from 'react';
import {
  DataStore,
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';
import { Flex, Button, Text } from '@aws-amplify/ui-react';
import ExpandableCardWithGradient from 'components/ExpandableCardWithGradient';
import LexicalEditor from 'components/LexicalEditor';
import { useDecisionsQuery } from 'hooks/services';
import {
  Decision,
  Habitat,
  LazyDecision,
  TestApplication,
  SubmissionStatus,
} from 'models';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

interface IProperties {
  habitat?: Habitat;
  application?: TestApplication;
  onReviewReturnedApplication: () => void;
}

const SuccesfullySubmitted = ({
  habitat,
  application,
  onReviewReturnedApplication,
}: IProperties) => {
  const { data: decisions }: { data: Decision[] } = useDecisionsQuery({
    criteria: (c1: RecursiveModelPredicate<LazyDecision>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application],
    paginationProducer: {
      sort: (s: SortPredicate<LazyDecision>) =>
        s.createdAt(SortDirection.DESCENDING),
    },
  });

  return (
    <Flex direction="column">
      <Text fontWeight="bold">
        {application?.submissionStatus === SubmissionStatus.RETURNED
          ? 'Your application has been returned. Please take a moment to review your decision messages below to understand what you need to fix in your application.'
          : `You have succesfully submitted your Homeownership Program application
          for ${habitat?.name}. You will receive an email with updates on your
          application.`}
      </Text>
      <Flex justifyContent="end">
        {application?.submissionStatus === SubmissionStatus.RETURNED ? (
          <Button variation="primary" onClick={onReviewReturnedApplication}>
            Review
          </Button>
        ) : (
          <Link to="../review">
            <Button variation="primary">Review</Button>
          </Link>
        )}
      </Flex>
      <Flex direction="column">
        <Text>Decisions made to you application:</Text>
        {decisions.map((decision) => (
          <ExpandableCardWithGradient>
            <Flex direction="column" gap="0.5rem">
              <Text>
                <b>Status:</b> {decision.status}
              </Text>
              <Text>
                <b>Date:</b>{' '}
                {dayjs(decision.createdAt).format('YYYY-MM-DD HH:mm a')}
              </Text>
              <Text fontWeight="bold">Message:</Text>
            </Flex>
            <LexicalEditor
              serializedEditorState={decision.serializedEditorState}
            />
          </ExpandableCardWithGradient>
        ))}
      </Flex>
    </Flex>
  );
};

export default SuccesfullySubmitted;
