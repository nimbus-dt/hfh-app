import PropTypes from 'prop-types';
import React from 'react';
import {
  Card,
  Heading,
  SelectField,
  Flex,
  Button,
  TextField,
} from '@aws-amplify/ui-react';
import { DebtTypes } from '../../../../../models';

/**
 * Renders debt creation form. It is used to create a debt in the user's account and add it to the list of owners.
 *
 *
 * @return { JSX. Element } The div that displays the
 */
export function DebtCreate({ handleCreate, owners }) {
  return (
    <Card variation="elevated">
      <Heading textAlign="center">Debt Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns this debt?">
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name}`}
              </option>
            ))}
          </SelectField>

          <SelectField
            name="typeOfDebt"
            label="What type of debt is this"
            isRequired
            placeholder="Select an option"
          >
            <option value={DebtTypes.MEDICAL}>Medical</option>
            <option value={DebtTypes.STUDENT_LOANS}>Student Loan</option>
            <option value={DebtTypes.COLLECTIONS}>Collections</option>
            <option value={DebtTypes.CAR}>Car</option>
            <option value={DebtTypes.PERSONAL_LOANS}>Personal Loans</option>
            <option value={DebtTypes.INSTALLMENT_LOANS}>
              Installment Loan
            </option>
            <option value={DebtTypes.CREDIT_CARD}>Credit Card</option>
            <option value={DebtTypes.CHILD_SUPPORT}>Child Support</option>
            <option value={DebtTypes.ALIMONY}>Alimony</option>
            <option value={DebtTypes.OTHER}>Other</option>
          </SelectField>

          <TextField
            min={0}
            step={0.01}
            name="monthlyRecurrence"
            label="Estimated monthly recurring debt amount"
            placeholder="1000.50"
            isRequired
            type="number"
          />

          <TextField
            min={0}
            step={0.01}
            name="estimatedAmount"
            label="Estimated debt amount"
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

DebtCreate.propTypes = {
  handleCreate: PropTypes.func,
  owners: PropTypes.array,
};
