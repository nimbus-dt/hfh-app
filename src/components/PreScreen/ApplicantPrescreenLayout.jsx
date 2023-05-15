import { Outlet, useParams } from 'react-router-dom';
import { Flex } from '@aws-amplify/ui-react';
import { useState, useEffect } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { ApplicantPrescreenNavBar } from './ApplicantPreScreenNavBar';
import { Habitat } from '../../models';

export function ApplicantPrescreenLayout() {
  const [habitat, setHabitat] = useState([]);
  const urlName = useParams().habitat;
  useEffect(() => {
    async function fetchHabitats() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );

        setHabitat(habitatObject[0]);
      } catch (error) {
        console.log('Error retrieving Habitats', error);
      }
    }
    fetchHabitats();
  }, [urlName]);
  return (
    <Flex direction="column" alignItems="center">
      <ApplicantPrescreenNavBar />
      <Outlet context={[habitat, setHabitat]} />
    </Flex>
  );
}
