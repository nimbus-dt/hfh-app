import PropTypes from 'prop-types';
import { Card, Flex, Heading, Collection } from '@aws-amplify/ui-react';
import { IncomeDetail } from '../IncomeDetail/IncomeDetail';

export function IncomeList({ items, sizeRenderer, application, isEditable }) {
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
          {(item) => (
            <IncomeDetail
              key={item.id}
              item={item}
              sizeRenderer={sizeRenderer}
              application={application}
              isEditable={isEditable}
            />
          )}
        </Collection>
      </Flex>
    </Card>
  );
}

IncomeList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  sizeRenderer: PropTypes.bool,
  application: PropTypes.object,
  isEditable: PropTypes.bool,
};
