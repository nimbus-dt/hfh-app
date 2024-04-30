/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { MdAdd, MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import CustomButton from 'components/CustomButton/CustomButton';
import Toggle from 'components/Toggle';
import { Habitat } from 'models';
import { useRootFormsQuery } from 'hooks/services';
import { useParams } from 'react-router-dom';
import useDataStoreQuery from 'hooks/services/useDataStoreQuery';
import { dateOnly } from 'utils/dates';
import style from './AffiliateFormsPage.module.css';

const StatusChip = ({ status }: { status: string }) => {
  switch (status) {
    case 'ACTIVE':
      return <Chip variation="success" text={stringToHumanReadable(status)} />;
    case 'PENDING':
      return <Chip variation="warning" text={stringToHumanReadable(status)} />;
    default:
      return <Chip variation="disabled" text={stringToHumanReadable(status)} />;
  }
};

const AffiliateFormsPage = () => {
  const { habitat: habitatUrlName } = useParams();
  const [latestForms, setLatestForms] = useState([]);

  // Get Habitat
  const { data: habitat } = useDataStoreQuery({
    model: Habitat,
    criteria: (c: any) => c.urlName.eq(habitatUrlName),
  });

  // Get Forms
  const { data: forms } = useRootFormsQuery({
    criteria: (c1: any) =>
      c1.and((c2: any) => {
        const habitatModel = habitat ? (habitat[0] as Habitat) : null;
        const criteriaArr = habitatModel
          ? [c2.habitatID.eq(habitatModel.id)]
          : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [habitat],
  });

  const [view, setView] = useState<'ACTIVE' | 'PENDING'>('ACTIVE');

  // Change forms according on view
  useEffect(() => {
    function filterForms() {
      const filteredForms = forms.filter((form: any) => form.status === view);
      setLatestForms(filteredForms);
    }
    filterForms();
  }, [view, forms]);

  return (
    <Flex padding="32px" direction="column" gap="60px">
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
            option1={{ value: 'ACTIVE', label: 'Active' }}
            option2={{ value: 'PENDING', label: 'Pending' }}
            active={view}
            onChange={(newValue) => {
              if (newValue === 'ACTIVE' || newValue === 'PENDING') {
                setView(newValue);
              }
            }}
          />
        </Flex>
      </Flex>
      <Flex direction="column" gap="20px">
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Flex direction="row" alignItems="center">
            <View className="theme-subtitle-s2">
              <Text as="span" alignSelf="center">
                Active Forms
              </Text>
            </View>
            <Text className={`theme-subtitle-s2 ${style.subtitle}`}>
              {forms.length} results
            </Text>
          </Flex>
          <CustomButton icon={<MdAdd />}>New Form</CustomButton>
        </Flex>
        <TableWithPaginator
          headers={[
            {
              id: 'name',
              value: 'Name',
              width: '55%',
            },
            {
              id: 'dateCreated',
              value: 'Date Created',
              width: '15%',
            },
            {
              id: 'status',
              value: 'Status',
              textAlign: 'center',
              width: '15%',
            },
            {
              id: 'view',
              value: 'View',
              textAlign: 'center',
              width: '15%',
            },
          ]}
          data={latestForms.map((data: any, index: any) => ({
            id: index,
            cells: [
              { value: data.name, id: 'name' },
              { value: dateOnly(data.createdAt), id: 'dateCreated' },
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
        />
      </Flex>
    </Flex>
  );
};

export default AffiliateFormsPage;
