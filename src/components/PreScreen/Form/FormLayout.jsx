import { useParams, Outlet, useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Card,
  Divider,
  Pagination,
  Button,
} from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Auth } from 'aws-amplify';
import { Habitat, UserProps, Application } from '../../../models';
import { UserForm } from './UserForm';
import { HouseholdForm } from './HouseholdForm';

export function FormLayout() {
  const [habitat, setHabitat] = useState({});
  const urlName = useParams().habitat;
  const [userID, setUserID] = useState('');
  const [applicationExists, setApplicationExists] = useState(false);
  const [application, setApplication] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHabitat() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);
      } catch (error) {
        console.log('Error retrieving Habitat', error);
      }
    }

    fetchHabitat();
  });

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        {habitat?.name}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        PreScreen Form
      </Heading>
    </Flex>
  );

  const [page, setPage] = useState(1);

  function formSet() {
    if (page === 1) {
      return <UserForm />;
    }
    if (page === 2) {
      return <HouseholdForm application={application} />;
    }
  }

  return (
    <Card
      variation="outlined"
      wrap
      width={{ base: '80%', medium: '700px' }}
      marginBottom="30px"
    >
      <Divider marginBottom="10px" />
      <Flex direction="column" gap="xl">
        {title}
        <Pagination
          currentPage={page}
          totalPages={6}
          siblingCount={1}
          width="100%"
        />
        {formSet()}
        <Button
          onClick={() => {
            if (page !== 6) {
              setPage(page + 1);
            }
          }}
          width="fit-content"
        >
          Next
        </Button>
        <Button
          onClick={() => {
            if (page !== 1) {
              setPage(page - 1);
            }
          }}
          width="fit-content"
        >
          Previous
        </Button>
      </Flex>
      <Divider marginTop="20px" />
    </Card>
  );
}
