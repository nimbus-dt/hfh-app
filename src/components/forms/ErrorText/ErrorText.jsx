import { Text } from '@aws-amplify/ui-react';
import PropTypes from 'prop-types';

export function ErrorText({ message }) {
  return (
    <Text fontSize="0.85rem" variation="error" fontStyle="italic">
      {message}
    </Text>
  );
}

ErrorText.propTypes = {
  message: PropTypes.string,
};

ErrorText.defaultProps = {
  message: '',
};
