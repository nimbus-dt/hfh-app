import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Flex,
  Heading,
  Text,
  View,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import { DataStore } from '@aws-amplify/datastore';

import DecisionCard from 'components/DecisionCard';
import {
  Decision,
  Habitat,
  ReviewStatus,
  RootForm,
  TestApplication,
  TestCycle,
} from 'models';

import style from './ApplicantDecisionsPage.module.css';

interface IOutletContext {
  habitat?: Habitat;
}

const ApplicantDecisionsPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  const { habitat }: IOutletContext = useOutletContext();
  const [applications, setApplications] = useState<TestApplication[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    if (habitat) {
      const fetch = async () => {
        const rootFormsResponse = await DataStore.query(RootForm, (c) =>
          c.habitatID.eq(habitat.id)
        );

        let newCycles: TestCycle[] = [];

        for (const rootFormResponse of rootFormsResponse) {
          const cyclesResponse = await DataStore.query(TestCycle, (c) =>
            c.rootformID.eq(rootFormResponse.id)
          );
          newCycles = newCycles.concat(cyclesResponse);
        }

        let newApplications: TestApplication[] = [];

        for (const newCycle of newCycles) {
          const applicationsResponse = await DataStore.query(
            TestApplication,
            (c) =>
              c.and((c1) => [
                c1.testcycleID.eq(newCycle.id),
                c1.ownerID.eq(user?.username),
              ])
          );
          newApplications = newApplications.concat(applicationsResponse);
        }

        let newDecisions: Decision[] = [];
        for (const newApplication of newApplications) {
          const decisionsResponse = await DataStore.query(Decision, (c) =>
            c.testapplicationID.eq(newApplication.id)
          );
          newDecisions = newDecisions.concat(decisionsResponse);
        }

        setApplications(newApplications);
        setDecisions(
          newDecisions.sort((a, b) => {
            if (a.updatedAt && b.updatedAt) {
              return (
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime()
              );
            }
            return 0;
          })
        );
      };
      fetch();
    }
  }, [habitat, user?.username]);

  return (
    <View padding="32px">
      <Flex className={`${style.cta}`} direction="column">
        <Heading level={3} className="theme-headline-medium">
          Decisions Dashboard
        </Heading>
        <View className={`theme-body-medium ${style.subtitle}`}>
          <Text color="inherit">
            Exchange information with affiliates and revise your submissions
          </Text>
        </View>
      </Flex>
      <Flex className={`${style.decisionsContainer}`}>
        {decisions.map((data) => (
          <DecisionCard
            key={data.id}
            date={data.updatedAt || ''}
            habitat={habitat?.longName || ''}
            status={ReviewStatus[data?.status || 'PENDING']}
            editorState={data.serializedEditorState}
            applicationRoute={
              data?.status === ReviewStatus.RETURNED
                ? `../${
                    applications.find(
                      (application) => data.testapplicationID === application.id
                    )?.testcycleID
                  }`
                : undefined
            }
          />
        ))}
      </Flex>
    </View>
  );
};

export default ApplicantDecisionsPage;
