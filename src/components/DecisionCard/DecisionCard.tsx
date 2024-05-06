import { Flex, Text, View } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import ExpandableCard from 'components/ExpandableCard';
import LexicalEditor from 'components/LexicalEditor';
import React from 'react';
import StatusChip from 'components/StatusChip';
import { ReviewStatus } from 'models';
import style from './DecisionCard.module.css';

interface IProperties {
  date: string;
  time: string;
  habitat: string;
  status: keyof typeof ReviewStatus;
  editorState: string;
}

const DecisionCard = ({
  date,
  time,
  habitat,
  status,
  editorState,
}: IProperties) => (
  <ExpandableCard>
    <Flex alignItems="start" gap="40px">
      <Flex direction="column" alignItems="end" gap="0">
        <View className="theme-subtitle-s2">
          <Text>{date}</Text>
        </View>
        <Text as="span" className={style.time}>
          {time}
        </Text>
      </Flex>
      <View flex="1">
        <View className={`theme-subtitle-s1 ${style.habitat}`}>
          <Text>{habitat}</Text>
        </View>
        <StatusChip status={status} />
        <LexicalEditor serializedEditorState={editorState} />
        <Flex justifyContent="right">
          <CustomButton>Review</CustomButton>
        </Flex>
      </View>
    </Flex>
  </ExpandableCard>
);

export default DecisionCard;
