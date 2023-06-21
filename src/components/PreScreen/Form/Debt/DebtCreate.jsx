/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { DataStore } from 'aws-amplify';
import {
  Card,
  Heading,
  SelectField,
  Flex,
  Button,
  StepperField,
  RadioGroupField,
  Radio,
} from '@aws-amplify/ui-react';
import { DebtRecord, DebtTypes, Application } from '../../../../models';

export function DebtCreate({ handleCreate, owners }) {
  const [Monthly, setMonthly] = useState(false);

  const handleMonthlyRecurrenceChange = (value) => {
    setMonthly(value === 'true');
  };

  async function submitApplication() {
    const applicationObject = await DataStore.query(DebtRecord, Application.id);

    await DataStore.save(
      DebtRecord.copyOf(applicationObject, (updated) => {
        updated.monthlyRecurrence = Monthly;
      })
    );
  }

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Debt Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns this debt?">
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name} ${owner.lastName}`}
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

          <RadioGroupField
            name="monthlyRecurrence"
            isRequired
            label="Is this a monthly recurring debt?"
            onChange={(e) => handleMonthlyRecurrenceChange(e.target.value)}
          >
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </RadioGroupField>

          <StepperField
            min={0}
            step={0.01}
            name="estimatedAmount"
            label="Estimated debt amount"
            placeholder="1000.50"
            isRequired
          />
          <Button type="submit" variation="primary">
            Submit
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
