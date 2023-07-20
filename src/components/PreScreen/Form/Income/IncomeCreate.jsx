/* eslint-disable react/prop-types */
import {
  Card,
  Heading,
  TextField,
  SelectField,
  StepperField,
  Flex,
  Button,
} from '@aws-amplify/ui-react';
import { DataStore, Storage } from 'aws-amplify';
import { useState } from 'react';
import { Habitat, IncomeTypes, IncomeRecord } from '../../../../models';

export function IncomeCreate({ owners, habitat, application }) {
  // Create new income record
  const handleCreate = async (e) => {
    e.preventDefault();

    // Access the form fields
    const formFields = e.target.elements;

    // Process file
    const file = formFields.proofOfIncome.files[0];
    const newFileName = `${habitat?.urlName}_${
      formFields.owner.value
    }_${Date.now()}_${file.name}`;
    const modifiedFile = new File([file], newFileName, { type: file.type });
    let result;
    try {
      result = await Storage.put(modifiedFile.name, modifiedFile, {
        level: 'protected',
      });
    } catch (error) {
      console.log(`Error uploading file: ${error}`);
    }

    // Get data from form
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
      proofOfIncome: [result?.key],
    };

    // Create income record
    await DataStore.save(
      new IncomeRecord({
        ownerID: data.owner,
        typeOfIncome: data.type,
        employer: data.employer,
        employmentTime: data.employmentTime,
        estimatedMonthlyIncome: Number(data.estimatedMonthlyIncome),
        proofOfIncome: data.proofOfIncome,
        applicationID: application?.id,
      })
    );

    // Reset the form
    e.target.reset();
  };

  return (
    <Card variation="elevated">
      <Heading textAlign="center">Income Record Create</Heading>
      <form onSubmit={handleCreate}>
        <Flex direction="column" gap="30px">
          <SelectField name="owner" label="Who owns this income record?">
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name}`}
              </option>
            ))}
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
          <TextField
            min={0}
            step={0.01}
            name="estimatedMonthlyIncome"
            label="Estimated monthly income"
            placeholder="$1000.50"
            isRequired
            type="number"
          />
          <TextField
            label="Upload most recent pay stub"
            descriptiveText="To remove uploaded file, reload screen"
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
