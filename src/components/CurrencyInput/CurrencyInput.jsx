import { Flex, Text, TextField } from '@aws-amplify/ui-react';
import React from 'react';
import PropTypes from 'prop-types';

const CurrencyInput = ({ onChange, currencySign = '$', ...otherProps }) => (
  <TextField
    {...otherProps}
    innerStartComponent={
      <Flex
        alignItems="center"
        justifyContent="center"
        height="100%"
        width="2.5rem"
      >
        <Text
          color={
            otherProps.isDisabled
              ? 'var(--amplify-colors-font-disabled)'
              : 'var(--amplify-colors-font-active)'
          }
        >
          {currencySign}
        </Text>
      </Flex>
    }
    inputStyles={{
      paddingLeft: '1.65rem',
    }}
    type="number"
    step=".01"
    onChange={(event) =>
      onChange(event.currentTarget.value.replace(currencySign, ''))
    }
  />
);

CurrencyInput.propTypes = {
  label: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  isDisabled: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  currencySign: PropTypes.string,
};

export default CurrencyInput;
