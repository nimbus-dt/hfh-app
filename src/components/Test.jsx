/* eslint-disable react/prop-types */
import {
  Card,
  Heading,
  TextField,
  SelectField,
  StepperField,
  Flex,
  Button,
  Text,
} from '@aws-amplify/ui-react';
import { Storage, Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { Habitat, IncomeTypes, IncomeRecord } from '../models';

export function Test({ owners, habitat, application }) {
  useEffect(() => {
    async function getFiles() {
      const result2 = await Storage.get(
        'alachua_ownerID_1689708250775_jgam-ggms.jpg',
        {
          level: 'protected',
          identityId: 'us-east-1:72cb5e9e-d441-48bd-b217-dc2ac5eed24a',
        }
      );
      console.log(result2);
    }
    getFiles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Access the form fields
    const formFields = e.target.elements;

    // Process file
    const file = formFields.proofOfIncome.files[0];
    const newFileName = `alachua_ownerID_${Date.now()}_${file.name}`;
    const modifiedFile = new File([file], newFileName, { type: file.type });
    const result = await Storage.put(modifiedFile.name, modifiedFile, {
      level: 'protected',
    });

    const data = {
      owner: formFields.owner.value,
      type: formFields.type.value,
      employer: formFields.employer.value,
      employmentTime: Number(
        Number(formFields.employmentTime.value).toFixed(2)
      ),
      estimatedMonthlyIncome: Number(
        Number(formFields.estimatedMonthlyIncome.value).toFixed(2)
      ),
      proofOfIncome: [result.key],
    };

    console.log(data);
    // Reset the form
    e.target.reset();
  };

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Income Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns this income record?">
            <option
              key="cab4936d-c91c-40cf-9b50-f7d17350c097"
              value="cab4936d-c91c-40cf-9b50-f7d17350c097"
            >
              Jose
            </option>
          </SelectField>
          <SelectField
            name="type"
            label="Type of income"
            isRequired
            placeholder="Select an option"
          >
            <option value={IncomeTypes.SALARIED_EMPLOYMENT}>
              Salaried Employment
            </option>
            <option value={IncomeTypes.HOURLY_EMPLOYMENT}>
              Hourly Employment
            </option>
            <option value={IncomeTypes.SELF_EMPLOYMENT}>Self Employment</option>
            <option value={IncomeTypes.SOCIAL_SECURITY_DISABILITY_INSURANCE}>
              Social Security Disability Insurance
            </option>
            <option value={IncomeTypes.SOCIAL_SECURITY_BENEFITS}>
              Social Security Benefits
            </option>
            <option value={IncomeTypes.SUPPLEMENTAL_SECURITY_INCOME}>
              Supplemental Security Income
            </option>
            <option value={IncomeTypes.HOUSING_VOUCHER}>Housing Voucher</option>
            <option value={IncomeTypes.CHILD_SUPPORT}>Child Support</option>
            <option value={IncomeTypes.ALIMONY_SUPPORT}>Alimony Support</option>
            <option value={IncomeTypes.VETERANS_AFFAIR_COMPENSATION}>
              Veterans Affairs Compensation
            </option>
            <option value={IncomeTypes.PENSION_PAYMENTS}>
              Pension Payments
            </option>
            <option value={IncomeTypes.MILITARY_ENTITLEMENTS}>
              Military Entitlements
            </option>
            <option value={IncomeTypes.OTHER}>Other</option>
          </SelectField>
          <TextField
            name="employer"
            label="Name of employer"
            placeholder="U.S Government"
            isRequired
          />
          <TextField
            name="employmentTime"
            label="How many months have you been employed in this job?"
            placeholder="12"
            isRequired
            type="number"
            min={0}
          />
          <StepperField
            min={0}
            step={0.01}
            name="estimatedMonthlyIncome"
            label="Estimated monthly income"
            placeholder="$1000.50"
            isRequired
          />
          <TextField
            label="Upload most recent pay stub"
            name="proofOfIncome"
            type="file"
            accept=".jpg, .png, .pdf"
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
