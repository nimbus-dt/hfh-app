import {
  Heading,
  Flex,
  View,
  Text,
  Button,
  CheckboxField,
} from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import CustomCard from 'components/CustomCard';

export default function HomeownershipTermsPage() {
  const { habitat } = useOutletContext();
  const navigate = useNavigate();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState(false);

  const handleOnChangeAgreeTerms = () => {
    setAgreeTerms((previousAgreeTerms) => !previousAgreeTerms);
    setError(false);
  };

  const handleOnClickNext = () => {
    if (agreeTerms) {
      navigate('../applicant-info');
    } else {
      setError(true);
    }
  };

  const content = (
    <>
      <View as="div">
        <Flex marginBottom="30px" direction="column" gap="xl">
          <Heading level="4" fontWeight="bold" marginBottom="-30px">
            Terms and Services
          </Heading>
          <Text>Please take a moment to read our terms and services:</Text>
          {habitat?.props.homeownershipTermsText?.map((item, index) => (
            <View as="div" key={index}>
              <Heading level="5">{item.title}</Heading>
              <Text>{item.body}</Text>
              <br />
            </View>
          ))}
        </Flex>
        <CheckboxField
          checked={agreeTerms}
          onChange={handleOnChangeAgreeTerms}
          label="I have read and agreed to the terms and services."
          hasError={error}
          errorMessage="You can't continue the application process without agreeing the terms."
        />
      </View>
      <Flex width="100%" justifyContent="space-between">
        <Button variation="primary" onClick={() => navigate('../home')}>
          Back
        </Button>
        <Button
          isDisabled={!agreeTerms}
          variation="primary"
          onClick={handleOnClickNext}
        >
          Next
        </Button>
      </Flex>
    </>
  );

  return <CustomCard>{content}</CustomCard>;
}
