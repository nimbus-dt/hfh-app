import PropTypes from 'prop-types';
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { DebtDetail } from '../DebtDetail/DebtDetail';

/**
 * Debt list for use in frontend. It is a list of items that can be displayed on top of the list.
 *
 *
 * @return { JSX. Element } The card to be rendered on the front end ( with a Heading
 */
export function DebtList({ items, sizeRenderer, isEditable }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Debt Records List</Heading>
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
          {(item) => (
            <DebtDetail
              key={item.id}
              item={item}
              sizeRenderer={sizeRenderer}
              isEditable={isEditable}
            />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}

DebtList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  sizeRenderer: PropTypes.bool,
  isEditable: PropTypes.bool,
};
