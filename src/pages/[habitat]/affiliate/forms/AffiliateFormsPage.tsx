import { Button, Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import { SubmissionStatus } from 'models';
import React, { useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import style from './AffiliateFormsPage.module.css';
import Toggle from './components/Toggle';

const dummyData = [
  {
    name: 'Homeownership',
    affiliate: 'Habitat for Humanity of Kenosha',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.SUBMITTED,
  },
  {
    name: 'Repairs',
    affiliate: 'Habitat for Humanity',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.UNSUBMITTED,
  },
  {
    name: 'Pre-Screen',
    affiliate: 'Habitat for Humanity of Loudon County',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.RETURNED,
  },
  {
    name: 'Homeownership',
    affiliate: 'Habitat for Humanity of Kenosha',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.SUBMITTED,
  },
  {
    name: 'Repairs',
    affiliate: 'Habitat for Humanity',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.UNSUBMITTED,
  },
  {
    name: 'Pre-Screen',
    affiliate: 'Habitat for Humanity of Loudon County',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.RETURNED,
  },
  {
    name: 'Homeownership',
    affiliate: 'Habitat for Humanity of Kenosha',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.SUBMITTED,
  },
  {
    name: 'Repairs',
    affiliate: 'Habitat for Humanity',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.UNSUBMITTED,
  },
  {
    name: 'Pre-Screen',
    affiliate: 'Habitat for Humanity of Loudon County',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.RETURNED,
  },
  {
    name: 'Homeownership',
    affiliate: 'Habitat for Humanity of Kenosha',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.SUBMITTED,
  },
  {
    name: 'Repairs',
    affiliate: 'Habitat for Humanity',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.UNSUBMITTED,
  },
  {
    name: 'Pre-Screen',
    affiliate: 'Habitat for Humanity of Loudon County',
    type: 'Online',
    dateSubmitted: '04/20/2024',
    status: SubmissionStatus.RETURNED,
  },
];

const StatusChip = ({ status }: { status: keyof typeof SubmissionStatus }) => {
  switch (status) {
    case SubmissionStatus.SUBMITTED:
      return <Chip variation="success" text={stringToHumanReadable(status)} />;
    case SubmissionStatus.UNSUBMITTED:
      return <Chip variation="warning" text={stringToHumanReadable(status)} />;
    case SubmissionStatus.RETURNED:
      return <Chip variation="danger" text={stringToHumanReadable(status)} />;
    default:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
  }
};

const AffiliateFormsPage = () => {
  const [view, setView] = useState<'active' | 'pending'>('active');
  const [applications, setApplications] = useState(dummyData);
  return (
    <Flex padding="32px" direction="column">
      <Flex
        direction={{
          base: 'column',
          medium: 'row',
        }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex direction="column">
          <Heading level={3}>Forms Dashboard</Heading>
        </Flex>
        <Flex className={`${style.toggleContainer}`}>
          <Toggle value={view} onChange={(newValue) => setView(newValue)} />
        </Flex>
      </Flex>
      <Flex direction="row" alignItems="center">
        <View className="theme-subtitle-s2">
          <Text as="span" alignSelf="center">
            Active Forms
          </Text>
        </View>
        <Text className={`theme-subtitle-s2 ${style.subtitle}`}>4 results</Text>
      </Flex>
      <TableWithPaginator
        headers={[
          {
            id: 'name',
            value: 'Name',
          },
          {
            id: 'affiliate',
            value: 'Affiliate',
          },
          {
            id: 'type',
            value: 'Type',
          },
          {
            id: 'dateSubmitted',
            value: 'Date submitted',
          },
          {
            id: 'status',
            value: 'Status',
            textAlign: 'center',
          },
          {
            id: 'view',
            value: 'View',
            textAlign: 'center',
          },
        ]}
        data={applications.map((data, index) => ({
          id: index,
          cells: [
            { value: data.name, id: 'name' },
            { value: data.affiliate, id: 'affiliate' },
            { value: data.type, id: 'type' },
            { value: data.dateSubmitted, id: 'dateSubmitted' },
            {
              value: (
                <Flex width="100%" justifyContent="center">
                  <StatusChip status={data.status} />
                </Flex>
              ),
              id: 'status',
            },
            {
              value: (
                <Flex width="100%" justifyContent="center">
                  <Button variation="link" padding="0">
                    <MdOutlineOpenInNew
                      size="24px"
                      color="var(--amplify-colors-neutral-90)"
                    />
                  </Button>
                </Flex>
              ),
              id: 'view',
            },
          ],
        }))}
        hasMoreData
        loadMoreData={() =>
          setApplications((prevApplications) => [
            ...prevApplications,
            ...dummyData,
          ])
        }
      />
    </Flex>
  );
};

export default AffiliateFormsPage;
