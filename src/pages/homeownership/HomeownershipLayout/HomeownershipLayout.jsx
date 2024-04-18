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
import { TestApplication, SubmissionStatus, ApplicationTypes } from 'models';
import { DataStore, SortDirection } from 'aws-amplify';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import { getHabitatOpenCycle } from 'utils/misc';
import CustomCard from 'components/CustomCard';
import NavBar from 'components/NavBar';

export default function HomeownershipLayout() {
  const { habitat: habitatUrlName } = useParams();

  const { habitat, error } = useHabitatByUrlName({
    habitatUrlName,
  });

  const [openCycle, setOpenCycle] = useState();

  const [alreadyRedirected, setAlreadyRedirected] = useState(false);

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

  const getApplication = useCallback(
    async (username) => {
      try {
        const habitatCycles = await habitat?.TestCycles.toArray();
        const existingApplication = await DataStore.query(
          TestApplication,
          (c1) =>
            c1.and((c2) => [
              c2.ownerID.eq(username),
              c2.or((c3) =>
                habitatCycles.map((cycle) => c3.testcycleID.eq(cycle.id))
              ),
            ]),
          {
            sort: (c) => c.createdAt(SortDirection.DESCENDING),
          }
        );
        return existingApplication[0];
      } catch (error) {
        console.log(`Error fetching the application data. ${error}`);
      }
    },
    [habitat?.TestCycles]
  );

  const createNewApplication = useCallback(
    async (username) => {
      try {
        const newApplication = await DataStore.save(
          new TestApplication({
            ownerID: username,
            lastSection: location.pathname,
            members: [],
            submissionStatus: SubmissionStatus.UNSUBMITTED,
            reviewStatus: DEFAULT_REVIEW_STATUS,
            submittedDate: '0001-01-01',
            testcycleID: openCycle.id,
            type: ApplicationTypes.ONLINE,
          })
        );

        return newApplication;
      } catch (error) {
        console.log('Error creating new application.');
      }
    },
    [location.pathname, openCycle?.id]
  );

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
      if (
        existingApplication !== undefined &&
        ((openCycle &&
          (existingApplication.testcycleID === openCycle.id ||
            existingApplication.submissionStatus !==
              SubmissionStatus.SUBMITTED)) ||
          existingApplication.submissionStatus === SubmissionStatus.RETURNED)
      ) {
        setApplication(existingApplication);
      } else if (openCycle) {
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
  }, [
    authStatus,
    application,
    user,
    habitat,
    openCycle,
    getApplication,
    createNewApplication,
  ]);

  useEffect(() => {
    const urlSections = location.pathname.split('/');
    if (
      !alreadyRedirected &&
      ((authStatus === 'unauthenticated' && urlSections[3] !== 'home') ||
        (application &&
          application.submissionStatus === SubmissionStatus.SUBMITTED &&
          authStatus === 'authenticated' &&
          urlSections[3] !== 'review') ||
        (openCycle === undefined &&
          application?.submissionStatus !== SubmissionStatus.RETURNED))
    ) {
      urlSections[3] = 'home';
      navigate(urlSections.join('/'));
    }
  }, [
    location.pathname,
    authStatus,
    application,
    openCycle,
    navigate,
    alreadyRedirected,
  ]);

  useEffect(() => {
    if (
      application &&
      authStatus === 'authenticated' &&
      !alreadyRedirected &&
      application.submissionStatus === SubmissionStatus.UNSUBMITTED
    ) {
      setAlreadyRedirected(true);
      navigate(application.lastSection);
    }
  }, [authStatus, application, navigate, alreadyRedirected]);

  useEffect(() => {
    const getOpenCycle = async () => {
      const currentOpenCycle = await getHabitatOpenCycle(habitat?.id);
      setOpenCycle(currentOpenCycle);
    };

    getOpenCycle();
  }, [habitat?.id]);

  return (
    <ScrollView height="100vh" ref={scrollViewReference}>
      <Flex
        direction="column"
        alignItems="center"
        backgroundColor="lightgray"
        minHeight="100vh"
        paddingBottom="1rem"
      >
        <NavBar isAuthenticated={authStatus === 'authenticated'} />
        <CustomCard> {content} </CustomCard>
        <Outlet
          context={{
            openCycle,
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
