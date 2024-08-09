import { DataStore } from 'aws-amplify/datastore';
import { TestApplication } from 'models';
import { LoaderFunction } from 'react-router-dom';

const applicationLoader: LoaderFunction = async ({ params }) => {
  const { applicationId } = params;

  if (!applicationId) {
    throw new Response('Application not specified.', { status: 400 });
  }

  const application = await DataStore.query(TestApplication, applicationId);

  if (!application) {
    throw new Response('Application not found.', { status: 404 });
  }

  const formAnswers = await application.FormAnswers.toArray();

  const decisions = await application.Decisions.toArray();

  return { application, formAnswers, decisions };
};

export default applicationLoader;
