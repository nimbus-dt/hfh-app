import { View } from '@aws-amplify/ui-react';
import { BasicInformation, Address } from '../FormComponents/FormApplicantInfo';

export function TestApplicantInfo() {
  return (
    <View as="div">
      <BasicInformation />
      <br />
      <Address />
    </View>
  );
}
