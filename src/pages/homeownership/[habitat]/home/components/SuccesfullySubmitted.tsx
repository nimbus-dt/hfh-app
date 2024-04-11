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
}: IProperties) => (
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
  </Flex>
);

export default SuccesfullySubmitted;
