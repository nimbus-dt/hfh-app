import { Auth, DataStore } from 'aws-amplify';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Flex, Button } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Application, UserProps } from 'models';
import GeneralInfoTable from 'components/applications/GeneralInfoTable';
import ApplicationSummary from 'components/applications/ApplicationSummary';
import ApplicationMetricsTable from 'components/applications/ApplicationMetricsTable';
import {
  useApplicationById,
  useDebtRecordsQuery,
  useHouseholdMembersQuery,
  useIncomeRecordsQuery,
  useSavingRecordsQuery,
} from 'hooks/services';
import {
  getAmi,
  getDebtToIncomeRatio,
  getIsWithinAmiRange,
  getTotalMonthlyDebts,
  getTotalMonthlyIncomes,
  getTotalSavings,
} from 'utils/applicationMetrics';

export function AffiliateApplicationDetailPage() {
  const [formData, setFormData] = useState({});
  const { habitat } = useOutletContext();
  const { applicationId } = useParams();
  const { data: selectedApplication } = useApplicationById({
    id: applicationId,
  });
  const queriesProps = {
    criteria: (c1) => c1.applicationID.eq(selectedApplication?.id),
    dependencyArray: [selectedApplication?.id],
  };
  const { data: incomes } = useIncomeRecordsQuery(queriesProps);
  const { data: householdMembers } = useHouseholdMembersQuery(queriesProps);
  const { data: savings } = useSavingRecordsQuery(queriesProps);
  const { data: debts } = useDebtRecordsQuery(queriesProps);
  const [userProps, setUserProps] = useState(null);
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');
  const [previousDataId, setPreviousDataId] = useState(null);
  const totalSavings = getTotalSavings(savings);
  const totalMonthlyIncomes = getTotalMonthlyIncomes(incomes);
  const totalMonthlyDebts = getTotalMonthlyDebts(debts);
  const debtToIncomeRatio = getDebtToIncomeRatio(
    totalMonthlyDebts,
    totalMonthlyIncomes
  );
  const ami = getAmi(habitat?.AMI || [], householdMembers.length);
  const isWithinAmiRange = getIsWithinAmiRange(ami, totalMonthlyIncomes);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser({
          bypassCache: false,
        });
        setUserID(currentUser.username);

        const userDataObject = await DataStore.query(Application, (u) =>
          u.ownerID.eq(currentUser.username)
        );

        if (userDataObject.length > 0) {
          setUserDataBool(true);
          const previousData = userDataObject[0];
          setPreviousDataId(previousData.id);
          const userData = userDataObject[0];
          setFormData({
            ownerName: userData.ownerName,
          });
        }
      } catch (error) {
        console.log('Error fetching UserData:', error);
      }
    };

    checkUserData();
  }, []);

  useEffect(() => {
    async function getUserProps() {
      try {
        const userPropsObject = await DataStore.query(UserProps, (item) =>
          item.ownerID.eq(selectedApplication?.ownerID)
        );

        const userPropsIndividual = userPropsObject[0];

        setUserProps(userPropsIndividual);
      } catch (error) {
        console.log(`Error fetching user props: ${error}`);
      }
    }

    getUserProps();
  }, [selectedApplication?.ownerID]);

  async function updateApplication(newStatus) {
    const currentUser = await Auth.currentAuthenticatedUser();
    const currentDate = new Date().toISOString().substring(0, 10);

    const original = await DataStore.query(Application, selectedApplication.id);
    await DataStore.save(
      Application.copyOf(original, (item) => {
        item.submittedStatus = newStatus;
        item.habitatRevisor = formData.ownerName; // change with proper username of the affiliate account. Right now only shows the id of the account
        item.dateRevised = currentDate;
      })
    );

    window.location.reload();
  }

  return (
    <Flex width="auto" direction="column">
      <Button
        width="fit-content"
        onClick={() => {
          navigate('../home');
        }}
      >
        Go back
      </Button>

      <GeneralInfoTable
        dateSubmitted={selectedApplication?.dateSubmitted}
        submittedStatus={selectedApplication?.submittedStatus}
        habitatRevisor={selectedApplication?.habitatRevisor}
        dateRevised={selectedApplication?.dateRevised}
      />

      <ApplicationSummary
        selectedApplication={selectedApplication}
        userProps={userProps}
        householdMembers={householdMembers}
        incomes={incomes}
        debts={debts}
        savings={savings}
      />

      <ApplicationMetricsTable
        totalMonthlyIncomes={totalMonthlyIncomes}
        totalSavings={totalSavings}
        totalMonthlyDebts={totalMonthlyDebts}
        debtToIncomeRatio={debtToIncomeRatio}
        ami={ami}
        isWithinAmiRange={isWithinAmiRange}
      />

      <Button onClick={() => updateApplication('ACCEPTED')}>Accept</Button>
      <Button onClick={() => updateApplication('REJECTED')}>Reject</Button>
    </Flex>
  );
}
