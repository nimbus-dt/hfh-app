import PropTypes from 'prop-types';
import { Card, Flex, Heading, Button } from '@aws-amplify/ui-react';
import { HiXMark } from 'react-icons/hi2';

export function RecordDetail({ title, renderBody, onDelete, sizeRenderer }) {
  return (
    <Card variation="elevated" width={sizeRenderer ? '100%' : '300px'}>
      <Flex direction="column" gap="1px">
        <Flex justifyContent="space-between" gap="0.5rem">
          <Heading level="4">{title}</Heading>

          <Button
            title="Remove record"
            shrink="0rem"
            type="button"
            variation="warning"
            height="2rem"
            width="2rem"
            padding="0rem"
            onClick={() => onDelete()}
          >
            <HiXMark size={20} />
          </Button>
        </Flex>

        {renderBody()}
      </Flex>
    </Card>
  );
}

RecordDetail.propTypes = {
  title: PropTypes.string,
  renderBody: PropTypes.func,
  onDelete: PropTypes.func,
  sizeRenderer: PropTypes.bool,
};

RecordDetail.defaultProps = {
  title: '',
  renderBody: () => {},
  onDelete: () => {},
  sizeRenderer: false,
};
