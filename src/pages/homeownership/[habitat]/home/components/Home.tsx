import { View, Flex, Button } from '@aws-amplify/ui-react';
import React from 'react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { Habitat } from 'models';

interface IProperties {
  habitat: Habitat;
}

const Home = ({ habitat }: IProperties) => {
  const navigate = useNavigate();
  return (
    <>
      <View as="div">
        <Flex marginBottom="30px" direction="column" gap="xl">
          <View
            as="div"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(habitat?.props.homeownershipHomeText),
            }}
          />
        </Flex>
      </View>
      <Flex justifyContent="end" width="100%">
        <Button variation="primary" onClick={() => navigate('../terms')}>
          Next
        </Button>
      </Flex>
    </>
  );
};

export default Home;
