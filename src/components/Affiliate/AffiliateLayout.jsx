import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore, Auth } from 'aws-amplify';
import {
  Card,
  Grid,
  Button,
  Flex,
  Menu,
  MenuItem,
  Image,
  Heading,
  Text,
  Divider,
  Collection,
  SelectField,
  Link,
} from '@aws-amplify/ui-react';
import { Habitat } from '../../models';
import logoHabitat from '../../assets/images/logoHabitat.svg';
import { AffiliatePrescreens } from './AffiliatePrescreens';
import { AffiliatePrescreenDetail } from './AffiliatePrescreenDetail';

export function AffiliateLayout() {
  const [page, setPage] = useState('prescreens');
  const [habitat, setHabitat] = useState(null);
  const [prescreens, setPrescreens] = useState([]);

  const navigate = useNavigate();

  const urlName = useParams('habitat').habitat;

  // Get habitat
  useEffect(() => {
    async function getHabitat() {
      try {
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);
        setPrescreens(await habitatObject[0].Applications.toArray());
      } catch (error) {
        console.log(`Error fetching habitat: ${error}`);
      }
    }
    getHabitat();
  }, [urlName]);

  const menu = (
    <Menu className="my-menu-content" triggerClassName="my-menu-trigger">
      <MenuItem>PreScreen</MenuItem>
      <MenuItem>Sign Out</MenuItem>
    </Menu>
  );

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        Welcome
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        {habitat?.name}
      </Heading>
      <Heading level={3} marginTop="-10px" fontWeight="bold">
        Habitat for Humanity
      </Heading>
    </Flex>
  );

  return (
    <Flex direction="column" height="100vh" alignItems="center">
      <Card
        wrap
        width="100%"
        backgroundColor="#55B949"
        padding="0"
        columnStart="1"
        columnEnd="-1"
      >
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Image alt="Habitat Logo" src={logoHabitat} height="100%" />
          <Flex marginRight="40px">{menu}</Flex>
        </Flex>
      </Card>

      <Card width="80%" variation="elevated">
        {title}
      </Card>

      <Card width="80%" variation="elevated">
        <Flex direction="column" alignItems="center">
          {page === 'prescreens' && (
            <AffiliatePrescreens prescreens={prescreens} />
          )}
        </Flex>
      </Card>
    </Flex>
  );
}
