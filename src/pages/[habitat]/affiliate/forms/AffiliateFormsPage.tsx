import { Button, Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { MdAdd, MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import CustomButton from 'components/CustomButton/CustomButton';
import Toggle from 'components/Toggle';
import style from './AffiliateFormsPage.module.css';

const dummyData = [
  {
    name: 'Homeownership',
    dateSubmitted: '04/20/2024',
    status: 'Accepted',
    unreviewed: 326,
  },
  {
    name: 'Repairs',
    dateSubmitted: '04/25/2024',
    status: 'Pending',
    unreviewed: 34,
  },
  {
    name: 'Pre Screens',
    dateSubmitted: '04/25/2024',
    status: 'Pending',
    unreviewed: 34,
  },
  {
    name: 'Uber',
    dateSubmitted: '04/25/2024',
    status: 'Pending',
    unreviewed: 124,
  },
];

const StatusChip = ({ status }: { status: string }) => {
  switch (status) {
    case 'Accepted':
      return <Chip variation="success" text={stringToHumanReadable(status)} />;
    case 'Pending':
      return <Chip variation="warning" text={stringToHumanReadable(status)} />;
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
          <Toggle
            option1={{ value: 'active', label: 'Active' }}
            option2={{ value: 'pending', label: 'Pending' }}
            active={view}
            onChange={(newValue) => {
              if (newValue === 'active' || newValue === 'pending') {
                setView(newValue);
              }
            }}
          />
        </Flex>
      </Flex>
      <Flex direction="row" alignItems="center" justifyContent="space-between">
        <Flex direction="row" alignItems="center">
          <View className="theme-subtitle-s2">
            <Text as="span" alignSelf="center">
              Active Forms
            </Text>
          </View>
          <Text className={`theme-subtitle-s2 ${style.subtitle}`}>
            4 results
          </Text>
        </Flex>
        <CustomButton icon={<MdAdd />}>New Form</CustomButton>
      </Flex>
      <TableWithPaginator
        headers={[
          {
            id: 'name',
            value: 'Name',
            width: '100%',
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
            id: 'unreviewed',
            value: 'Unreviewed',
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
            { value: data.dateSubmitted, id: 'dateSubmitted' },
            {
              value: (
                <Flex width="100%" justifyContent="center">
                  <StatusChip status={data.status} />
                </Flex>
              ),
              id: 'status',
            },
            { value: data.unreviewed, id: 'unreviewed' },
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
