import { Button, Flex, SelectField, TextField } from '@aws-amplify/ui-react';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdCheck, MdClose } from 'react-icons/md';

const newStatusUniqueId = '__new__';

const StatusSelect = ({ options, defaultValue, onChange }) => {
  const [value, setValue] = useState(defaultValue);
  const [newStatus, setNewStatus] = useState('');
  const [error, setError] = useState(false);

  const handleNewStatusOnChange = (event) => {
    setNewStatus(event.currentTarget.value);
  };

  const handleOnChange = (event) => {
    setValue(event.currentTarget.value);
  };

  const handleAddlOnClick = () => {
    setValue(newStatus);
  };

  const handleCancelOnClick = () => setValue(defaultValue);

  useEffect(() => {
    if (newStatus === newStatusUniqueId) {
      setError(true);
    } else {
      setError(false);
    }
  }, [newStatus]);

  useEffect(() => {
    if (value !== newStatusUniqueId && value !== defaultValue) {
      onChange(value);
    }
  }, [onChange, value, newStatusUniqueId]);

  return value === newStatusUniqueId ? (
    <Flex
      gap="0.25rem"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <TextField
        labelHidden
        placeholder="New status"
        hasError={error}
        errorMessage="Invalid status"
        value={newStatus}
        onChange={handleNewStatusOnChange}
      />
      <Flex>
        <Button
          padding="0.25rem"
          variation="primary"
          title="Add"
          isDisabled={error || newStatus === ''}
          onClick={handleAddlOnClick}
        >
          <MdCheck />
        </Button>
        <Button
          padding="0.25rem"
          variation="destructive"
          title="Cancel"
          onClick={handleCancelOnClick}
        >
          <MdClose />
        </Button>
      </Flex>
    </Flex>
  ) : (
    <SelectField labelHidden value={value} onChange={handleOnChange}>
      {options.map((statusValue) => (
        <option key={statusValue} value={statusValue}>
          {statusValue}
        </option>
      ))}
      <option
        style={{ backgroundColor: 'var(--amplify-colors-background-success)' }}
        value={newStatusUniqueId}
      >
        Add new
      </option>
    </SelectField>
  );
};

StatusSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

export default StatusSelect;
