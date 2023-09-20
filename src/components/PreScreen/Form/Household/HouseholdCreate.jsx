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
import { SEX_TYPES_LIST } from 'utils/constants';

export function HouseholdCreate({ handleCreate, enableCoapplicants }) {
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
          <TextField name="dob" label="Date of Birth" type="date" isRequired />
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
            <option value={RelationshipTypes.SPOUSE}>Spouse</option>
            <option value={RelationshipTypes.SON}>Son</option>
            <option value={RelationshipTypes.DAUGHTER}>Daughter</option>{' '}
            <option value={RelationshipTypes.NEPHEW}>Nephew</option>{' '}
            <option value={RelationshipTypes.NIECE}>Niece</option>{' '}
            <option value={RelationshipTypes.PARENT}>Parent</option>
            <option value={RelationshipTypes.SIBLING}>Sibling</option>
            <option value={RelationshipTypes.OTHER}>Other</option>
          </SelectField>
          <RadioGroupField
            name="isCoapplicant"
            isRequired
            label="Is this person a coapplicant?"
            isDisabled={!enableCoapplicants}
            descriptiveText={
              enableCoapplicants
                ? 'A coapplicant will also be required to input financial data.'
                : 'You have reached the maximum number of coapplicants.'
            }
          >
            <Radio value="yes">Yes</Radio>
            <Radio value="no">No</Radio>
          </RadioGroupField>

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
  enableCoapplicants: PropTypes.bool.isRequired,
};
