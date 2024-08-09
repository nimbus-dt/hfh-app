import { DataStore } from 'aws-amplify/datastore';
import { RootForm } from 'models';
import { LoaderFunction } from 'react-router-dom';

const rootFormLoader: LoaderFunction = async ({ params }) => {
  const { formId } = params;

  if (!formId) {
    throw new Response('Form not specified.', { status: 400 });
  }

  const rootForm = await DataStore.query(RootForm, formId);

  if (!rootForm) {
    throw new Response('Root form not found.', { status: 404 });
  }

  return { rootForm };
};

export default rootFormLoader;
