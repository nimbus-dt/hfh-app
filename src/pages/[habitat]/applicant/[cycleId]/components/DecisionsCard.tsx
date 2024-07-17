import {
  RecursiveModelPredicate,
  SortPredicate,
  SortDirection,
} from 'aws-amplify/datastore';
import { Flex, Text } from '@aws-amplify/ui-react';
import CustomCard from 'components/CustomCard';
import ExpandableCardWithGradient from 'components/ExpandableCardWithGradient';
import LexicalEditor from 'components/LexicalEditor';
import dayjs from 'dayjs';
import { useDecisionsQuery } from 'hooks/services';
import { Decision, LazyDecision, TestApplication } from 'models';
import React from 'react';

interface IProperties {
  application?: TestApplication;
}

const DecisionsCard = ({ application }: IProperties) => {
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
    <CustomCard>
      <Flex direction="column">
        <Text fontWeight="bold">
          Review below all the decisions made to your application.
        </Text>
        {decisions.map((decision) => (
          <ExpandableCardWithGradient>
            <Flex direction="column" gap="0.5rem">
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
    </CustomCard>
  );
};

export default DecisionsCard;
