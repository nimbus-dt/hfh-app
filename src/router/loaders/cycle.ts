import { DataStore } from 'aws-amplify/datastore';
import { TestCycle } from 'models';
import { LoaderFunction } from 'react-router-dom';

const cycleLoader: LoaderFunction = async ({ params }) => {
  const { cycleId } = params;

  if (!cycleId) {
    throw new Response('Cycle not specified.', { status: 400 });
  }

  const cycle = await DataStore.query(TestCycle, cycleId);

  if (!cycle) {
    throw new Response('Root form not found.', { status: 404 });
  }

  return { cycle };
};

export default cycleLoader;
