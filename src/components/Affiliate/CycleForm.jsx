/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
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
  Authenticator,
  TextField,
} from '@aws-amplify/ui-react';
import logoHabitat from '../../assets/images/logoHabitat.svg';

import { Cycles, Habitat } from '../../models'; // Make sure to import the correct models path

export function CycleForm() {
  const [habitat, setHabitat] = useState(null);
  const [isUserAllowed, setIsUserAllowed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userID, setUserID] = useState('');
  const [formData, setFormData] = useState({
    cycleStartDate: '',
    cycleEndDate: '',
    cycleSeason: '',
  });

  const navigate = useNavigate();
  const urlName = useParams('habitat').habitat;

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      // Sign-out successful, perform any additional actions or navigate to the desired page
    } catch (error) {
      console.log('Error signing out:', error);
      // Handle sign-out error
    }
  };

  useEffect(() => {
    async function fetchHabitat() {
      try {
        // Fetch habitat and user information
        const habitatObject = await DataStore.query(Habitat, (c) =>
          c.urlName.eq(urlName)
        );
        setHabitat(habitatObject[0]);

        const allowedUsers = habitatObject[0].users || [];
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUserID(currentUser.username);

        if (allowedUsers.includes(currentUser.username)) {
          setIsUserAllowed(true);
        } else {
          setIsUserAllowed(false);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(`Error fetching habitat: ${error}`);
      }
    }

    fetchHabitat();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const currentDate = new Date();
      const isWithinCycle =
        currentDate >= new Date(formData.cycleStartDate) &&
        currentDate <= new Date(formData.cycleEndDate);
      console.log('Cycle Start Date:', formData.cycleStartDate);
      console.log('Cycle End Date:', formData.cycleEndDate);
      console.log('Current Date:', currentDate);
      console.log('Is Within Cycle:', isWithinCycle);
      console.log('Cycle Season:', formData.cycleSeason);
      console.log('Habitat ID:', habitat.id);
      // Create a new cycle using DataStore
      const newCycle = await DataStore.save(
        new Cycles({
          // Make sure to import the correct model

          cycleStartDate: formData.cycleStartDate,
          cycleEndDate: formData.cycleEndDate,
          cycleStatus: isWithinCycle,
          cycleSeason: formData.cycleSeason,
          habitatID: habitat.id,
        })
      );

      // Update the habitat to include the new cycle
      await DataStore.save(
        Habitat.copyOf(habitat, (updatedHabitat) => {
          updatedHabitat.Cycles = [...updatedHabitat.Cycles, newCycle];
        })
      );

      console.log('New cycle created:', newCycle);
      // Perform any necessary actions or navigation here
    } catch (error) {
      console.error('Error creating cycle:', error);
    }
  };

  // Calculate the current season and year

  const currentDate2 = new Date();
  const currentMonth = currentDate2.getMonth() + 1; // Adding 1 because months are zero-based
  let currentYear = currentDate2.getFullYear();

  // Determine the current season based on the month
  let currentSeason = 'Winter';
  if (currentMonth >= 3 && currentMonth <= 5) {
    currentSeason = 'Spring';
  } else if (currentMonth >= 6 && currentMonth <= 8) {
    currentSeason = 'Summer';
  } else if (currentMonth >= 9 && currentMonth <= 11) {
    currentSeason = 'Fall';
  }

  // Calculate the next four seasons
  const nextSeasons = [];
  for (let i = 0; i < 4; i++) {
    nextSeasons.push(`${currentSeason} ${currentYear}`);
    switch (currentSeason) {
      case 'Winter':
        currentSeason = 'Spring';
        break;
      case 'Spring':
        currentSeason = 'Summer';
        break;
      case 'Summer':
        currentSeason = 'Fall';
        break;
      case 'Fall':
        currentSeason = 'Winter';
        currentYear += 1;
        break;
      default:
        break;
    }
  }

  const menu = (
    <Menu className="my-menu-content" triggerClassName="my-menu-trigger">
      <MenuItem onClick={() => navigate('../home')}>PreScreen</MenuItem>
      <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const title = (
    <Flex direction="column">
      <Heading level={3} fontWeight="bold">
        Create New {habitat?.name} Cycle
      </Heading>
    </Flex>
  );

  let content;
  if (isLoading) {
    content = <Text>Loading...</Text>;
  } else if (isUserAllowed) {
    content = (
      <>
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
            <form onSubmit={handleSubmit}>
              <SelectField
                name="cycleSeason"
                label="Cycle Season"
                isRequired
                defaultValue={nextSeasons[0]} // Set the default value to the first calculated season
                onChange={(event) =>
                  setFormData({ ...formData, cycleSeason: event.target.value })
                }
              >
                {nextSeasons.map((season) => (
                  <option key={season} value={season}>
                    {season}
                  </option>
                ))}
              </SelectField>
              <TextField
                name="cycleStartDate"
                label="Cycle Start Date"
                type="date"
                isRequired
                value={formData.cycleStartDate}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    cycleStartDate: event.target.value,
                  })
                }
              />
              <TextField
                name="cycleEndDate"
                label="Cycle End Date"
                type="date"
                isRequired
                value={formData.cycleEndDate}
                onChange={(event) =>
                  setFormData({ ...formData, cycleEndDate: event.target.value })
                }
              />
              <Button type="submit" variation="primary">
                Submit
              </Button>
            </form>
          </Flex>
        </Card>
      </>
    );
  } else {
    content = (
      <Card width="80%" variation="elevated">
        <Text>
          Sorry, you are not allowed to access this page. Please contact the
          administrator for assistance.
        </Text>
      </Card>
    );
  }

  return (
    <Flex direction="column" height="100vh" alignItems="center">
      {content}
    </Flex>
  );
}
