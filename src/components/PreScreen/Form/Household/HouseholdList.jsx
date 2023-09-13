/* eslint-disable react/prop-types */
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { HouseholdDetail } from './HouseholdDetail';

export function HouseholdList({ items, sizeRenderer }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Household Member List</Heading>
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
            <HouseholdDetail
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
