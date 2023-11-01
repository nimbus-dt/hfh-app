import PropTypes from 'prop-types';
import {
  Card,
  Heading,
  TextField,
  SelectField,
  Radio,
  RadioGroupField,
  Flex,
  Button,
} from '@aws-amplify/ui-react';
import { RELATIONSHIP_TYPES_LIST, SEX_TYPES_LIST } from 'utils/constants';
import { useState } from 'react';
import { isAdult as isAdultUtility } from 'utils/dates';

export function HouseholdCreate({ handleCreate }) {
  const [isAdult, setIsAdult] = useState(false);

  const handleDoBChange = (e) => {
    const newDob = e.target.value;
    setIsAdult(isAdultUtility(newDob));
  };

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Household Member Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <TextField
            name="name"
            label="Full legal name"
            isRequired
            placeholder="Jane Sara Doe"
          />

          <TextField
            name="dob"
            label="Date of Birth"
            type="date"
            onChange={handleDoBChange}
            isRequired
          />

          <SelectField
            name="sex"
            label="Sex"
            isRequired
            placeholder="Select an option"
          >
            {SEX_TYPES_LIST.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </SelectField>

          <SelectField
            name="relationship"
            label="Relationship"
            isRequired
            placeholder="Select an option"
          >
            {RELATIONSHIP_TYPES_LIST.map(({ key, value }) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </SelectField>

          {isAdult && (
            <RadioGroupField
              name="isUnemployed"
              label="Is this person unemployed?"
              descriptiveText="A unemployed household member will not be required to input financial data."
              isRequired
            >
              <Radio value="yes">Yes</Radio>
              <Radio value="no">No</Radio>
            </RadioGroupField>
          )}

          <Button type="submit" variation="primary">
            Add
          </Button>
        </Flex>
      </form>
    </Card>
  );
}

HouseholdCreate.propTypes = {
  handleCreate: PropTypes.func.isRequired,
};
