/* eslint-disable react/prop-types */
import {
  Card,
  Heading,
  TextField,
  SelectField,
  Flex,
  Button,
  StepperField,
} from '@aws-amplify/ui-react';

export function SavingsCreate({ handleCreate, owners }) {
  return (
    <Card variation="elevated">
      <Heading textAlign="center">Saving Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns these savings?">
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name}`}
              </option>
            ))}
          </SelectField>
          <TextField
            name="institution"
            label="Institution where savings are held"
            placeholder="Bank of America"
            isRequired
          />
          <TextField
            min={0}
            step={0.01}
            name="estimatedAmount"
            label="Estimated savings amount"
            placeholder="1000.50"
            isRequired
            type="number"
          />
          <Button type="submit" variation="primary">
            Add
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
