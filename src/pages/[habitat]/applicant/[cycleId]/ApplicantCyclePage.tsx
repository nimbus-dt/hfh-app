import { useCallback, useState } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { useLoaderData, useLocation } from 'react-router-dom';
import {
  SubmissionStatus,
  TestApplication,
  TestCycle,
  ReviewStatus,
  ApplicationTypes,
} from 'models';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Status } from 'utils/enums';
import { DataStore, SortDirection } from 'aws-amplify/datastore';
import useHabitat from 'hooks/utils/useHabitat';
import Form from './components/Form';
import NoOpenCycle from './components/NoOpenCycle';
import SuccesfullySubmitted from './components/SuccesfullySubmitted';
import Loading from './components/Loading';
import Error from './components/Error';
import style from './ApplicantCyclePage.module.css';
import { DataProps, DISPLAY, ERROR } from './ApplicantCyclePage.types';
import Reviewed from './components/Reviewed/Reviewed';

const ApplicantCyclePage = () => {
  const { habitat } = useHabitat();

  const { cycle } = useLoaderData() as { cycle: TestCycle };

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

      const applications = await DataStore.query(
        TestApplication,
        (c1) =>
          c1.and((c2) => [
            c2.testcycleID.eq(cycle.id),
            c2.ownerID.eq(user.username),
          ]),
        {
          sort: (c) => c.createdAt(SortDirection.DESCENDING),
        }
      );

      let [application] = applications;

      if (applications.length === 0) {
        if (!cycle.isOpen) {
          return {
            display: DISPLAY.NO_OPEN_CYCLE,
            data: {
              error: ERROR.CYCLE_NOT_OPEN,
            },
          };
        }
        if (sessionStorage.getItem('creatingApplication')) {
          return {
            display: DISPLAY.LOADING,
          };
        }

        sessionStorage.setItem('creatingApplication', 'true');

        const newApplication = await DataStore.save(
          new TestApplication({
            ownerID: user.username,
            lastPage: 0,
            lastSection: location.pathname,
            submissionStatus: SubmissionStatus.INCOMPLETE,
            reviewStatus: ReviewStatus.PENDING,
            submittedDate: '0001-01-01',
            testcycleID: cycle.id,
            type: ApplicationTypes.ONLINE,
          })
        );
        application = newApplication;
        sessionStorage.removeItem('creatingApplication');
        return {
          display: DISPLAY.APPLICATION,
          data: {
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
          display: DISPLAY.REVIEWED,
          data: {
            application,
          },
        };
      }

      if (application.submissionStatus === SubmissionStatus.COMPLETED) {
        return {
          display: DISPLAY.COMPLETED,
          data: {
            application,
          },
        };
      }

      if (!cycle.isOpen) {
        return {
          display: DISPLAY.NO_OPEN_CYCLE,
          data: {
            error: ERROR.CYCLE_NOT_OPEN,
            application,
          },
        };
      }

      return {
        display: DISPLAY.APPLICATION,
        data: {
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
  }, [habitat, cycle, review, user.username, location.pathname]);

  const { value, status } = useAsync({
    asyncFunction: getData,
  });

  if (status === Status.PENDING) {
    return <Loading />;
  }

  if (status === Status.REJECTED) {
    return <Error />;
  }

  if (value?.display === DISPLAY.LOADING) {
    return <Loading />;
  }

  if (value?.display === DISPLAY.ERROR) {
    return <Error error={value.data.error} />;
  }

  if (!habitat) {
    return <Error error={ERROR.HABITAT_NOT_FOUND} />;
  }

  if (value?.display === DISPLAY.REVIEWED) {
    return (
      <div className={`${style.page}`}>
        <Reviewed
          habitat={habitat}
          cycle={cycle}
          application={value.data.application}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    );
  }

  if (value?.display === DISPLAY.NO_OPEN_CYCLE) {
    return (
      <div className={`${style.page}`}>
        <NoOpenCycle
          cycle={cycle}
          onReview={onReview}
          showReview={
            value?.data?.application?.submissionStatus ===
            SubmissionStatus.COMPLETED
          }
        />
      </div>
    );
  }

  if (value?.display === DISPLAY.COMPLETED) {
    return (
      <div className={`${style.page}`}>
        <SuccesfullySubmitted
          onReview={onReview}
          application={value.data.application}
        />
      </div>
    );
  }

  return (
    <Form
      application={value?.data?.application}
      cycle={cycle}
      formContainer={false}
    />
  );
};

export default ApplicantCyclePage;
