/* eslint-disable react/prop-types */
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { IncomeDetail } from './IncomeDetail';

export function IncomeList({ items, sizeRenderer, application }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Income Record List</Heading>
        <Collection
          items={items}
          type="list"
          gap="1rem"
          templateColumns="1fr 1fr"
          itemsPerPage={1}
          alignItems="center"
          isPaginated
          wrap
        >
          {(item, index) => (
            <IncomeDetail
              item={item}
              sizeRenderer={sizeRenderer}
              key={index}
              application={application}
            />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}
