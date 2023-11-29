import { Flex, Card, Button, Badge, ScrollView } from '@aws-amplify/ui-react';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { TestNav } from './TestNav';

export function TestLayout() {
  const [page, setPage] = useState(1);
  return (
    <Flex
      direction="column"
      alignItems="center"
      height="100vh"
      backgroundColor="lightgray"
    >
      <TestNav />
      <Card
        variation="outlined"
        wrap
        width={{ base: '80%', medium: '500px' }}
        height="80vh"
        borderRadius="20px"
      >
        <Flex direction="column" width="100%" height="90%">
          <ScrollView>
            <Outlet />
          </ScrollView>
        </Flex>
        <Flex direction="row" width="100%" height="10%" justifyContent="end">
          <Flex direction="column" width="20%" alignItems="start">
            <Button
              variation="primary"
              isDisabled={page === 1}
              onClick={() => {
                setPage(page - 1);
              }}
            >
              Back
            </Button>
          </Flex>
          <Flex
            direction="column"
            width="60%"
            alignItems="center"
            justifyContent="center"
          >
            <Badge>Section {page}</Badge>
          </Flex>
          <Flex direction="column" width="20%" alignItems="end">
            <Button
              variation="primary"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
