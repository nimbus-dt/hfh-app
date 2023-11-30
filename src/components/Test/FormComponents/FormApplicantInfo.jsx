import {
  RadioGroupField,
  TextField,
  Radio,
  Button,
  Flex,
} from '@aws-amplify/ui-react';
import { CustomExpandableCard } from '../Reusable/CustomExpandableCard';

export function BasicInformation() {
  return (
    <CustomExpandableCard title="❌ Basic Information">
      <TextField label="What is your full name?" placeholder="John Doe" />
      <br />
      <TextField
        label="If you have an alternative or a former name, please write it here."
        placeholder="James Doe"
      />
      <br />
      <TextField
        label="What is your social security number?"
        placeholder="AAA-GG-SSSS"
      />
      <br />
      <TextField
        label="What is your home phone?"
        placeholder="(800) 555‑0100"
      />
      <br />
      <TextField
        label="What is your cell phone?"
        placeholder="(800) 555‑0100"
      />
      <br />
      <TextField
        label="What is your work phone?"
        placeholder="(800) 555‑0100"
      />
      <br />
      <TextField label="What is your age?" placeholder="30" type="number" />
      <br />
      <TextField label="What is your date of birth?" type="date" />
      <br />
      <RadioGroupField
        legend="Language"
        name="language"
        label="Which of these best represents your current marital status?"
      >
        <Radio value="HTML">Married</Radio>
        <Radio value="CSS">Separated</Radio>
        <Radio value="JavaScript">
          Unmarried (single, divorced, widowed, civil union, domestic
          partnership, registered reciprocal beneficiary relationship)
        </Radio>
      </RadioGroupField>
      <br />
      <Flex width="100%" justifyContent="end">
        <Button variation="primary">Save</Button>
      </Flex>
    </CustomExpandableCard>
  );
}

export function Address() {
  return (
    <CustomExpandableCard title="❌ Address">
      <TextField
        label="What is your present address?"
        placeholder="70 Morningside Dr, New York, New York, 10027"
      />
      <br />
      <TextField
        label="How long have you lived at this address, in months?"
        placeholder="48"
        type="number"
      />
      <br />
      <RadioGroupField
        legend="Language"
        name="language"
        label="Which of these best represents the ownership status of the address you currently live in?"
      >
        <Radio value="HTML">Own</Radio>
        <Radio value="CSS">Rent</Radio>
      </RadioGroupField>
    </CustomExpandableCard>
  );
}

export function PrevAddress() {
  return (
    <CustomExpandableCard title="Previous Address">
      <TextField
        label="What is your previous address?"
        placeholder="70 Morningside Dr, New York, New York, 10027"
      />
      <br />
      <TextField
        label="How long did you live at this address, in months?"
        placeholder="48"
        type="number"
      />
      <br />
      <RadioGroupField
        legend="Language"
        name="language"
        label="Which of these best represents the ownership status of the previous address you lived in?"
      >
        <Radio value="HTML">Own</Radio>
        <Radio value="CSS">Rent</Radio>
      </RadioGroupField>
    </CustomExpandableCard>
  );
}
