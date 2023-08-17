/* eslint-disable react/prop-types */
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { DebtDetail } from './DebtDetail';

/**
 * Debt list for use in frontend. It is a list of items that can be displayed on top of the list.
 *
 *
 * @return { JSX. Element } The card to be rendered on the front end ( with a Heading
 */
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
