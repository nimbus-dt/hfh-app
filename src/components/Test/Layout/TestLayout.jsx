import {
  Flex,
  Heading,
  ScrollView,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import useScrollToTopOnRouteChange from 'hooks/utils/useScrollToTopOnRouteChange';
import { useCallback, useEffect, useRef, useState } from 'react';
import { TestApplication } from 'models';
import { DataStore } from 'aws-amplify';
import { TestNav } from './TestNav';
import { CustomCard } from '../Reusable/CustomCard';

export function TestLayout() {
  const { habitat: habitatUrlName } = useParams();
  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });
  const scrollViewReference = useRef(null);
  useScrollToTopOnRouteChange(scrollViewReference);

  const [application, setApplication] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  if (error) {
    console.log('Error retrieving Habitat:', error.message);
  }

  const content = (
    <Heading level={4} fontWeight="bold" textAlign="center">
      Homeownership Program Application
    </Heading>
  );

  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const getApplication = async (username) => {
    try {
      const existingApplication = await DataStore.query(TestApplication, (c1) =>
        c1.and((c2) => [
          c2.ownerID.eq(username),
          c2.testApplicationAffiliateId.eq(habitat.id),
        ])
      );
      return existingApplication[0];
    } catch (error) {
      console.log(`Error fetching the application data. ${error}`);
    }
  };

  const createNewApplication = async (username) => {
    try {
      const newApplication = await DataStore.save(
        new TestApplication({
          ownerID: username,
          lastSection: location.pathname,
          members: [],
          submitted: false,
          submissionStatus: 'Unsubmitted',
          reviewStatus: 'Pending',
          testApplicationAffiliateId: habitat.id,
        })
      );

      return newApplication;
    } catch (error) {
      console.log('Error creating new application.');
    }
  };

  const updateApplicationLastSection = useCallback(async () => {
    try {
      const original = await DataStore.query(TestApplication, application);
      const persistedApplicantInfo = await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.lastSection = location.pathname;
        })
      );
      setApplication(persistedApplicantInfo);
    } catch (error) {
      console.log(`Error updating the application's last section.`);
    }
  }, [application, location.pathname]);

  useEffect(() => {
    const getOrCreateApplication = async () => {
      const existingApplication = await getApplication(user.username);
      if (existingApplication !== undefined) {
        setApplication(existingApplication);
      } else {
        const newApplication = await createNewApplication(user.username);
        setApplication(newApplication);
      }
    };
    if (
      authStatus === 'authenticated' &&
      application === undefined &&
      user !== undefined &&
      habitat
    ) {
      getOrCreateApplication();
    }
    if (authStatus === 'unauthenticated') {
      setApplication();
    }
  }, [authStatus, application, user, habitat]);

  useEffect(() => {
    const urlSections = location.pathname.split('/');
    if (
      (authStatus === 'unauthenticated' && urlSections[3] !== 'home') ||
      (application &&
        application.submitted &&
        authStatus === 'authenticated' &&
        urlSections[3] !== 'review')
    ) {
      urlSections[3] = 'home';
      navigate(urlSections.join('/'));
    }
  }, [location.pathname, authStatus, application]);

  useEffect(() => {
    if (application && authStatus === 'authenticated') {
      navigate(application.lastSection);
    }
  }, [authStatus, application]);

  return (
    <ScrollView height="100vh" ref={scrollViewReference}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor="lightgray"
        minHeight="100vh"
        paddingBottom="1rem"
      >
        <TestNav isAuthenticated={authStatus === 'authenticated'} />
        <CustomCard> {content} </CustomCard>
        <Outlet
          context={{
            habitat,
            application,
            setApplication,
            updateApplicationLastSection,
          }}
        />
      </Flex>
    </ScrollView>
  );
}
