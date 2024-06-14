/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import Chip from 'components/Chip';
import { stringToHumanReadable } from 'utils/strings';
import Toggle from 'components/Toggle';
import { Habitat } from 'models';
import { useRootFormsQuery } from 'hooks/services';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { dateOnly } from 'utils/dates';
import { throttle } from 'lodash';
import style from './AffiliateFormsPage.module.css';
import NewFormButton from './components/NewFormButton';

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
  const navigate = useNavigate();
  const [latestForms, setLatestForms] = useState([]);
  const [trigger, setTrigger] = useState(true);

  localStorage.removeItem('goto');

  // Get context
  interface OutletContextType {
    habitat: Habitat;
  }

  const context = useOutletContext<OutletContextType>();
  const { habitat } = context;

  // Get Forms
  const { data: forms } = useRootFormsQuery({
    criteria: (c1: any) =>
      c1.and((c2: any) => {
        const criteriaArr = habitat ? [c2.habitatID.eq(habitat.id)] : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [habitat, trigger],
  });

  const [view, setView] = useState<'ACTIVE' | 'PENDING'>('ACTIVE');

  const triggerUpdate = () => setTrigger((prevTrigger) => !prevTrigger);

  // Change forms according on view
  useEffect(() => {
    function filterForms() {
      const filteredForms = forms.filter((form: any) => form.status === view);
      setLatestForms(filteredForms);
    }
    filterForms();
  }, [view, forms]);

  const onClickView = (id: string) => {
    navigate(`../${id}`);
  };

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
                {view === 'ACTIVE' ? 'Active Forms' : 'Pending Forms'}
              </Text>
            </View>
            <Text className={`theme-subtitle-s2 ${style.subtitle}`}>
              {latestForms.length} results
            </Text>
          </Flex>
          <NewFormButton triggerUpdate={triggerUpdate} />
        </Flex>
        {view === 'PENDING' ? (
          <TableWithPaginator
            headers={[
              {
                id: 'name',
                value: 'Name',
                width: '70%',
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
              ],
            }))}
          />
        ) : (
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
                      <Button
                        variation="link"
                        padding="0"
                        onClick={throttle(() => onClickView(data.id), 500)}
                      >
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
        )}
      </Flex>
    </Flex>
  );
};

export default AffiliateFormsPage;
