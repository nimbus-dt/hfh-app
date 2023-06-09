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
import { DataStore } from 'aws-amplify';
import { useState } from 'react';
import { StorageManager } from '@aws-amplify/ui-react-storage';
import { Habitat, IncomeTypes, IncomeRecord } from '../../../../models';

export function IncomeCreate({ owners, habitat, application }) {
  const [files, setFiles] = useState([]);

  // Create new income record
  const handleCreate = async (e) => {
    e.preventDefault();

    // Access the form fields
    const formFields = e.target.elements;

    const data = {
      owner: formFields.owner.value,
      type: formFields.type.value,
      employer: formFields.employer.value,
      estimatedMonthlyIncome: formFields.estimatedMonthlyIncome.value,
    };

    // Create income record
    await DataStore.save(
      new IncomeRecord({
        ownerID: data.owner,
        typeOfIncome: data.type,
        employer: data.employer,
        estimatedMonthlyIncome: data.estimatedMonthlyIncome,
        proofOfIncome: [],
        applicationID: application?.id,
      })
    );

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
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {`${owner.name} ${owner.lastName}`}
              </option>
            ))}
          </SelectField>
          <SelectField name="type" label="Type of income">
            {Object.values(IncomeTypes).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </SelectField>
          <TextField
            name="employer"
            label="Name of employer"
            placeholder="Microsoft"
            isRequired
          />
          <StepperField
            min={0}
            step={0.01}
            name="estimatedMonthlyIncome"
            label="Estimated monthly income"
            placeholder="$1000.50"
            isRequired
          />
          <StorageManager
            acceptedFileTypes={['image/*,.pdf']}
            accessLevel="protected"
            maxFileCount={5}
            name="proofOfIncome"
            displayText={{
              dropFilesText: 'Upload proof of income',
            }}
            processFile={processFile}
            onFileRemove={onFileRemove}
          />
          <Button type="submit" variation="primary">
            Submit
          </Button>
        </Flex>
      </form>
    </Card>
  );
}
