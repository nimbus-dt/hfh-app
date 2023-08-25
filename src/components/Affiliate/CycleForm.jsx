import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { DataStore } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Divider,
  SelectField,
  TextField,
} from '@aws-amplify/ui-react';

import { Cycles, Habitat } from '../../models'; // Make sure to import the correct models path

export function CycleForm() {
  const { habitat } = useOutletContext();
  const [formData, setFormData] = useState({
    cycleStartDate: '',
    cycleEndDate: '',
    cycleSeason: '',
  });

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
  for (let i = 0; i < 4; i += 1) {
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

  return (
    <Flex direction="column" alignItems="center">
      <Heading level={3} fontWeight="bold" textAlign="center">
        Create New {habitat?.name} Cycle
      </Heading>

      <Divider />

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
  );
}
