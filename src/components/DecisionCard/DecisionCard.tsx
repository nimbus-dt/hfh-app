import { Flex, Text, View } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import ExpandableCard from 'components/ExpandableCard';
import LexicalEditor from 'components/LexicalEditor';
import React from 'react';
import StatusChip from 'components/StatusChip';
import { ReviewStatus } from 'models';
import { dateOnly, timeOnly } from 'utils/dates';
import style from './DecisionCard.module.css';

interface IProperties {
  date: string;
  habitat: string;
  status: keyof typeof ReviewStatus;
  editorState: string;
  showReviewButton?: boolean;
}

const DecisionCard = ({
  date,
  habitat,
  status,
  editorState,
  showReviewButton,
}: IProperties) => (
  <ExpandableCard>
    <Flex alignItems="start" gap="40px">
      <Flex direction="column" alignItems="end" gap="0">
        <View className="theme-subtitle-s2">
          <Text>{dateOnly(date)}</Text>
        </View>
        <Text as="span" className={style.time}>
          {timeOnly(date)}
        </Text>
      </Flex>
      <View flex="1">
        <View className={`theme-subtitle-s1 ${style.habitat}`}>
          <Text>{habitat}</Text>
        </View>
        <StatusChip status={status} />
        <LexicalEditor serializedEditorState={editorState} />
        {showReviewButton && (
          <Flex justifyContent="right">
            <CustomButton>Review</CustomButton>
          </Flex>
        )}
      </View>
    </Flex>
  </ExpandableCard>
);

export default DecisionCard;
