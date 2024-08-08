import { DataStore } from 'aws-amplify/datastore';
import { Habitat } from 'models';
import { LoaderFunction } from 'react-router-dom';

const habitatLoader: LoaderFunction = async ({ params }) => {
  const { habitat } = params;
  const habitatsResponse = await DataStore.query(Habitat, (c) =>
    c.urlName.eq(habitat)
  );

  if (habitatsResponse.length === 0) {
    throw new Response('Habitat not Found', { status: 404 });
  }

  return { habitat: habitatsResponse[0] };
};

export default habitatLoader;
