/* eslint-disable react/prop-types */
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { SavingsDetail } from './SavingsDetail';

export function SavingsList({ items, sizeRenderer }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Saving Records List</Heading>
        <Collection
          items={items}
          type={sizeRenderer ? 'list' : 'grid'}
          gap="1rem"
          templateColumns="1fr 1fr"
          itemsPerPage={sizeRenderer ? 1 : 4}
          alignItems="center"
          isPaginated
          wrap
        >
          {(item, index) => (
            <SavingsDetail
              item={item}
              sizeRenderer={sizeRenderer}
              key={index}
            />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}
