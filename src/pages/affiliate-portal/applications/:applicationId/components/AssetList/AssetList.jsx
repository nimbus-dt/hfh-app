import PropTypes from 'prop-types';
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { AssetDetail } from '../AssetDetail/AssetDetail';

export function AssetList({ items, sizeRenderer, isEditable }) {
  return (
    <Card variation="elevated" width="100%">
      <Flex direction="column" alignItems="center" justifyContent="center">
        <Heading>Assets Records List</Heading>
        <Collection
          items={items}
          type="list"
          gap="1rem"
          templateColumns="1fr 1fr"
          itemsPerPage="1"
          alignItems="center"
          isPaginated
          wrap
        >
          {(item) => (
            <AssetDetail
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

AssetList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  sizeRenderer: PropTypes.bool,
  isEditable: PropTypes.bool,
};
