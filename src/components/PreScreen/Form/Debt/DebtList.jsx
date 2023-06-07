/* eslint-disable react/prop-types */
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import DebtDetail from './DebtDetail';

export function DebtList({ items, sizeRenderer }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Debt Records List</Heading>
        <Collection
          items={items}
          type={sizeRenderer ? 'list' : 'grid'}
          gap="20px"
          templateColumns="1fr 1fr"
          templateRows="12rem 12rem"
          wrap
          isPaginated
          itemsPerPage={sizeRenderer ? 1 : 4}
          alignItems="center"
        >
          {(item, index) => (
            <DebtDetail item={item} sizeRenderer={sizeRenderer} key={index} />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}
