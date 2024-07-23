import { DataStore, SortDirection } from 'aws-amplify/datastore';
import { TestCycle } from 'models';
import states from '../assets/jsons/states.json';

export const getCheckOrExEmoji = (condition) => (condition ? '✔️' : '❌');

/**
 *
 * @param {string} habitatId The id of the habitat to get their open cycle
 * @returns openCycle The last open cycle of the habitat, undefined if there's no open cycle.
 */
export const getHabitatOpenCycle = async (habitatId) => {
  try {
    const openCycles = await DataStore.query(
      TestCycle,
      (c) => c.and((c2) => [c2.habitatID.eq(habitatId), c2.isOpen.eq(true)]),
      { sort: (c) => c.startDate(SortDirection.DESCENDING), limit: 1 }
    );
    if (openCycles.length) {
      return openCycles[0];
    }
  } catch (error) {
    console.log('Error retrieving habitat open cycle');
  }
};

/**
 *
 * @param {string} stateAbbreviation The abbreviation for a state
 * @returns stateName The full name of the state.
 */
export const getStateName = (stateAbbreviation) => {
  const state = states.find(
    (stateObj) => stateObj.abbreviation === stateAbbreviation
  );

  return state ? state.name : '';
};
