import { useCallback, useState } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';
import { MdOutlineNoteAlt, MdOutlineLibraryAddCheck } from 'react-icons/md';
import { DataStore, SortDirection } from 'aws-amplify';

import { Loader, useAuthenticator } from '@aws-amplify/ui-react';

import {
  SubmissionStatus,
  TestApplication,
  TestCycle,
  ReviewStatus,
  ApplicationTypes,
} from 'models';
import { OutletContextProps } from 'types';
import LocalNavigation from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]/components/LocalNavigation';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Status } from 'utils/enums';

import Form from './components/Form/Form';
import NoOpenCycle from './components/NoOpenCycle';
import Decisions from './components/Tabs/Decisions';
import SuccesfullySubmitted from './components/SuccesfullySubmitted';
import style from './ApplicantCyclePage.module.css';
import { DataProps, DISPLAY, ERROR } from './ApplicantCyclePage.types';

const ApplicantCyclePage = () => {
  const { habitat }: OutletContextProps = useOutletContext();
  const { cycleId } = useParams();

  const { user } = useAuthenticator((context) => [context.user]);

  const location = useLocation();
  const [activeTab, setActiveTab] = useState(1);
  const [review, setReview] = useState(false);

  const onReview = () => {
    setActiveTab(0);
    setReview(true);
  };

  const getData = useCallback(async (): Promise<DataProps> => {
    try {
      if (!habitat) {
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.HABITAT_NOT_FOUND,
          },
        };
      }
      if (!cycleId) {
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };
      }

      const cycle = await DataStore.query(TestCycle, cycleId);

      if (!cycle) {
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };
      }

      const applications = await DataStore.query(
        TestApplication,
        (c1) =>
          c1.and((c2) => [
            c2.testcycleID.eq(cycleId),
            c2.ownerID.eq(user.username),
          ]),
        {
          sort: (c) => c.createdAt(SortDirection.DESCENDING),
        }
      );

      let [application] = applications;

      if (!application) {
        if (!cycle.isOpen) {
          return {
            display: DISPLAY.NO_OPEN_CYCLE,
            data: {
              error: ERROR.CYCLE_NOT_OPEN,
              cycle,
            },
          };
        }
        const newApplication = await DataStore.save(
          new TestApplication({
            ownerID: user.username,
            lastPage: 0,
            lastSection: location.pathname,
            submissionStatus: SubmissionStatus.INCOMPLETE,
            reviewStatus: ReviewStatus.PENDING,
            submittedDate: '0001-01-01',
            testcycleID: cycleId,
            type: ApplicationTypes.ONLINE,
          })
        );
        application = newApplication;
        return {
          display: DISPLAY.APPLICATION,
          data: {
            cycle,
            application,
          },
        };
      }

      if (!cycle.isOpen) {
        return {
          display: DISPLAY.NO_OPEN_CYCLE,
          data: {
            error: ERROR.CYCLE_NOT_OPEN,
            cycle,
            application,
          },
        };
      }

      const reviewed =
        application.reviewStatus === ReviewStatus.ACCEPTED ||
        application.reviewStatus === ReviewStatus.DENIED ||
        application.reviewStatus === ReviewStatus.RETURNED;

      if (reviewed || review) {
        return {
          display: DISPLAY.REVIEW,
          data: {
            cycle,
            application,
          },
        };
      }

      if (application.submissionStatus === SubmissionStatus.COMPLETED) {
        return {
          display: DISPLAY.COMPLETED,
          data: {
            cycle,
            application,
          },
        };
      }

      return {
        display: DISPLAY.APPLICATION,
        data: {
          cycle,
          application,
        },
      };
    } catch (error) {
      return {
        display: DISPLAY.ERROR,
        data: {
          error: ERROR.UNEXPECTED_ERROR,
        },
      };
    }
  }, [habitat, cycleId, review, user.username, location.pathname]);

  const { value, status } = useAsync({
    asyncFunction: getData,
  });

  // DONE: PENDING
  if (status === Status.PENDING) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Loader
          style={{
            width: '2rem',
            height: '2rem',
          }}
          emptyColor="var(--amplify-colors-neutral-80)"
          filledColor="var(--amplify-colors-neutral-100)"
        />
      </div>
    );
  }

  // DONE: REJECTED
  if (status === Status.REJECTED) {
    return (
      <div className={`${style.page}`}>
        <span>Error</span>
      </div>
    );
  }

  // DONE: ERROR
  if (value?.display === DISPLAY.ERROR) {
    return (
      <div className={`${style.page}`}>
        <span>{value.data.error}</span>
      </div>
    );
  }

  // DONE: NO_OPEN_CYCLE
  if (value?.display === DISPLAY.NO_OPEN_CYCLE) {
    return (
      <div className={`${style.page}`}>
        <NoOpenCycle
          cycle={value?.data?.cycle}
          onReview={onReview}
          showReview={
            value?.data?.application?.submissionStatus ===
            SubmissionStatus.COMPLETED
          }
        />
      </div>
    );
  }

  // DONE: COMPLETED
  if (value?.display === DISPLAY.COMPLETED) {
    return (
      <div className={`${style.page}`}>
        <SuccesfullySubmitted
          habitat={habitat}
          onReview={onReview}
          application={value.data.application}
        />
      </div>
    );
  }

  // DONE: REVIEW
  if (value?.display === DISPLAY.REVIEW) {
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
              <Form
                habitat={habitat}
                application={value.data.application}
                cycle={value.data.cycle}
              />
            )}
            {activeTab === 1 && (
              <Decisions application={value.data.application} />
            )}
          </div>
        </div>
      </div>
    );
  }

  // DONE: APPLICATION
  return (
    <Form
      habitat={habitat}
      application={value?.data?.application}
      cycle={value?.data?.cycle}
      formContainer={false}
    />
  );
};

export default ApplicantCyclePage;
