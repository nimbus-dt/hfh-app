import { Loader, useAuthenticator } from '@aws-amplify/ui-react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import {
  Habitat,
  SubmissionStatus,
  TestApplication,
  TestCycle,
  ReviewStatus,
  ApplicationTypes,
  User,
} from 'models';
import { MdOutlineNoteAlt, MdOutlineLibraryAddCheck } from 'react-icons/md';
import { useCallback, useEffect, useState } from 'react';
import { DataStore, SortDirection } from 'aws-amplify';
import { useTestCycleById } from 'hooks/services';
import LocalNavigation from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]/components/LocalNavigation';
import Form from './components/Form/Form';
import SuccesfullySubmitted from './components/SuccesfullySubmitted';
import NoOpenCycle from './components/NoOpenCycle';
import style from './ApplicantCyclePage.module.css';
import Decisions from './components/Tabs/Decisions';

interface IOutletContext {
  habitat?: Habitat;
}

const ApplicantCyclePage = () => {
  const { habitat }: IOutletContext = useOutletContext();

  const { cycleId } = useParams();

  const { authStatus, user } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const location = useLocation();

  const { data: cycle }: { data: TestCycle | undefined } = useTestCycleById({
    id: cycleId || '',
    dependencyArray: [cycleId],
  });

  const [application, setApplication] = useState<TestApplication>();
  const [activeTab, setActiveTab] = useState(0);
  const [review, setReview] = useState(false);

  const onReview = () => setReview(true);

  const getApplication = useCallback(
    async (username: string) => {
      try {
        if (cycleId) {
          const existingApplication = await DataStore.query(
            TestApplication,
            (c1) =>
              c1.and((c2) => [
                c2.ownerID.eq(username),
                c2.testcycleID.eq(cycleId),
              ]),
            {
              sort: (c) => c.createdAt(SortDirection.DESCENDING),
            }
          );
          return existingApplication[0];
        }
      } catch (error) {
        console.log(`Error fetching the application data. ${error}`);
      }
    },
    [cycleId]
  );

  const createNewApplication = useCallback(
    async (username: string) => {
      try {
        if (cycle) {
          const newApplication = await DataStore.save(
            new TestApplication({
              ownerID: username,
              lastSection: location.pathname,
              members: [],
              submissionStatus: SubmissionStatus.INCOMPLETE,
              reviewStatus: ReviewStatus.PENDING,
              submittedDate: '0001-01-01',
              testcycleID: cycle.id,
              type: ApplicationTypes.ONLINE,
            })
          );

          return newApplication;
        }
      } catch (error) {
        console.log('Error creating new application.');
      }
    },
    [location.pathname, cycle]
  );

  useEffect(() => {
    const getOrCreateApplication = async () => {
      if (user && user.username) {
        const existingApplication = await getApplication(user.username);
        if (existingApplication !== undefined) {
          setApplication(existingApplication);
        } else if (cycle) {
          const newApplication = await createNewApplication(user.username);
          setApplication(newApplication);
        }
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
      setApplication(undefined);
    }
  }, [
    authStatus,
    application,
    user,
    habitat,
    cycle,
    getApplication,
    createNewApplication,
  ]);

  if (!cycle || !application)
    return (
      <div className={`${style.page}`}>
        <Loader />
        <span>Loading</span>
      </div>
    );

  if (!cycle.isOpen && !review)
    return (
      <div className={`${style.page}`}>
        <NoOpenCycle
          cycle={cycle}
          onReview={onReview}
          showReview={
            application.submissionStatus === SubmissionStatus.COMPLETED
          }
        />
      </div>
    );

  if (application.submissionStatus === SubmissionStatus.COMPLETED && !review) {
    return (
      <div className={`${style.page}`}>
        <SuccesfullySubmitted
          habitat={habitat}
          onReview={onReview}
          application={application}
        />
      </div>
    );
  }

  if (review) {
    return (
      <div className={`${style.page}`}>
        <div className={style.detailsContainer}>
          <LocalNavigation
            items={[
              { label: 'Application', icon: <MdOutlineNoteAlt /> },
              { label: 'Decisions', icon: <MdOutlineLibraryAddCheck /> },
            ]}
            current={activeTab}
            onChange={(newCurrent) => setActiveTab(newCurrent)}
          />
          <div className={style.tabContainer}>
            {activeTab === 0 && (
              <Form habitat={habitat} application={application} cycle={cycle} />
            )}
            {activeTab === 1 && <Decisions application={application} />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form
      habitat={habitat}
      application={application}
      cycle={cycle}
      formContainer={false}
    />
  );
};

export default ApplicantCyclePage;
