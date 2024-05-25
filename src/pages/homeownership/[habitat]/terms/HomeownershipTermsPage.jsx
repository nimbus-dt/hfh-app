import { Flex, View, Button, CheckboxField } from '@aws-amplify/ui-react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import CustomCard from 'components/CustomCard';
import DOMPurify from 'dompurify';

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
          <View
            as="div"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(''),
            }}
          />
        </Flex>
        <CheckboxField
          checked={agreeTerms}
          onChange={handleOnChangeAgreeTerms}
          label="I have read and agreed to the terms of service."
          hasError={error}
          errorMessage="You can't continue the application process without agreeing the terms of service."
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
