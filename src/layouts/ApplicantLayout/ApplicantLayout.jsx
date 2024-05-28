import { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { DataStore, SortDirection } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import Authentication from 'components/Authentication';
import useHabitatByUrlName from 'hooks/services/useHabitatByUrlName';
import useScrollToTopOnRouteChange from 'hooks/utils/useScrollToTopOnRouteChange';
import {
  TestApplication,
  SubmissionStatus,
  ApplicationTypes,
  User,
} from 'models';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import { getHabitatOpenCycle } from 'utils/misc';
import BaseLayout from 'layouts/BaseLayout';

import { AUTHENTICATION_STATUS } from './utils';
import SignUpQuestions from './SignUpQuestions';

const HabitatLayout = () => {
  const { habitat: habitatUrlName } = useParams();

  const { habitat } = useHabitatByUrlName({
    habitatUrlName,
  });

  const [userData, setUserData] = useState();

  const [openCycle, setOpenCycle] = useState();

  const [application, setApplication] = useState();

  useScrollToTopOnRouteChange();

  const location = useLocation();

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
    const getOpenCycle = async () => {
      const currentOpenCycle = await getHabitatOpenCycle(habitat?.id);
      setOpenCycle(currentOpenCycle);
    };

    getOpenCycle();
  }, [habitat?.id]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const persistUserDatas = await DataStore.query(User, (c) =>
          c.owner.eq(user.username)
        );
        if (persistUserDatas.length > 0) {
          setUserData(persistUserDatas[0]);
        }
      } catch (error) {
        console.log('Error fetching user data.');
      }
    };

    if (user && !userData) {
      getUserData();
    }
  });

  if (habitat == null || authStatus === AUTHENTICATION_STATUS.CONFIGURING) {
    return <div>Loading...</div>;
  }

  if (AUTHENTICATION_STATUS.AUTHENTICATED !== authStatus) {
    return (
      <Authentication
        authenticationHeader={habitat?.authenticationHeader}
        gallery={habitat?.props?.gallery}
      />
    );
  }

  if (!userData) {
    return (
      <SignUpQuestions
        habitat={habitat}
        user={user}
        setUserData={setUserData}
      />
    );
  }

  return (
    <BaseLayout variation="applicant">
      <Outlet
        context={{
          openCycle,
          habitat,
          application,
          setApplication,
          updateApplicationLastSection,
        }}
      />
    </BaseLayout>
  );
};

export default HabitatLayout;
