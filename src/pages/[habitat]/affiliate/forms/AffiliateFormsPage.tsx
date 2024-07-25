/* eslint-disable react/destructuring-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex, Heading, Text, View } from '@aws-amplify/ui-react';
import React from 'react';
import { MdOutlineOpenInNew } from 'react-icons/md';
import TableWithPaginator from 'components/TableWithPaginator';
import { useRootFormsQuery } from 'hooks/services';
import { useNavigate } from 'react-router-dom';
import { dateOnly } from 'utils/dates';
import { throttle } from 'lodash';
import useHabitat from 'hooks/utils/useHabitat';
import { useTranslation } from 'react-i18next';
import style from './AffiliateFormsPage.module.css';

const AffiliateFormsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  localStorage.removeItem('goto');

  // Get context

  const { habitat } = useHabitat();

  // Get Forms
  const { data: forms } = useRootFormsQuery({
    criteria: (c1: any) =>
      c1.and((c2: any) => {
        const criteriaArr = habitat ? [c2.habitatID.eq(habitat.id)] : [];
        return criteriaArr;
      }),
    paginationProducer: {},
    dependencyArray: [habitat],
  });

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
          <Heading level={3}>
            {t('pages.habitat.affiliate.forms.title')}
          </Heading>
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
                {t('pages.habitat.affiliate.forms.table.title')}
              </Text>
            </View>
            <Text className={`theme-subtitle-s2 ${style.subtitle}`}>
              {forms.length} {t('pages.habitat.affiliate.forms.table.results')}
            </Text>
          </Flex>
        </Flex>

        <TableWithPaginator
          headers={[
            {
              id: 'name',
              value: t('pages.habitat.affiliate.forms.table.name'),
              width: '70%',
            },
            {
              id: 'dateCreated',
              value: t('pages.habitat.affiliate.forms.table.dateCreated'),
              width: '15%',
            },

            {
              id: 'view',
              value: t('pages.habitat.affiliate.forms.table.view'),
              textAlign: 'center',
              width: '15%',
            },
          ]}
          data={forms.map((data: any, index: any) => ({
            id: index,
            cells: [
              { value: data.name, id: 'name' },
              { value: dateOnly(data.createdAt), id: 'dateCreated' },
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
      </Flex>
    </Flex>
  );
};

export default AffiliateFormsPage;
