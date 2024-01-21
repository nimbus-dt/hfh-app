import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { Flex, Button, useBreakpointValue } from '@aws-amplify/ui-react';
import {
  useApplicantInfosQuery,
  useRecordsQuery,
  useTestApplicationById,
  useWrittensQuery,
  useMembersQuery,
  useEmploymentInfosQuery,
  useIncomesQuery,
  useDebtsQuery,
  useAssetsQuery,
  useChecklistsQuery,
} from 'hooks/services';
import {
  getDebtToIncomeRatio,
  getTestTotalDebts,
  getTestTotalMonthlyDebts,
  getTestTotalMonthlyIncomes,
  getTotalAssetsValue,
} from 'utils/applicationMetrics';
import ApplicantInfoTable from './components/ApplicantInfoTable';
import GeneralInfoTable from './components/GeneralInfoTable';
import ChecklistTable from './components/ChecklistTable';
import WrittenTable from './components/WrittenTable';
import RecordsTable from './components/RecordsTable';
import EmploymentTable from './components/EmploymentTable';
import FinancialInfoSection from './components/FinancialInfoSection/FinancialInfoSection';
import ApplicationMetricsTable from './components/ApplicationMetricsTable';
import HouseholdTable from './components/HouseholdTable';

const TestApplicationDetails = () => {
  const { habitat } = useOutletContext();
  const { applicationId } = useParams();
  const { data: application } = useTestApplicationById({
    id: applicationId,
  });
  const queriesProps2 = {
    criteria: (c1) => c1.ownerID.eq(application?.id),
    dependencyArray: [application?.id],
  };

  const { data: applicantInfos } = useApplicantInfosQuery(queriesProps2);
  const { data: checklists } = useChecklistsQuery(queriesProps2);
  const { data: writtens } = useWrittensQuery(queriesProps2);
  const { data: records } = useRecordsQuery(queriesProps2);
  const { data: members } = useMembersQuery({
    criteria: (c1) => c1.testapplicationID.eq(application?.id),
    dependencyArray: [application?.id],
  });
  const { data: employmentInfos } = useEmploymentInfosQuery(queriesProps2);
  const queriesProps1 = {
    criteria: (c1) => {
      const membersIdArray = members.map((member) => member.id);

      const applicantAndMembersIdArray = [
        applicantInfos[0].id,
        ...membersIdArray,
      ];

      return c1.or((c2) => {
        const arrayOfFilters = applicantAndMembersIdArray.map((id) =>
          c2.ownerId.eq(id)
        );

        return arrayOfFilters;
      });
    },
    dependencyArray: [application?.id, applicantInfos, members],
  };
  const { data: incomes } = useIncomesQuery(queriesProps1);
  const { data: debts } = useDebtsQuery(queriesProps1);
  const { data: assets } = useAssetsQuery(queriesProps1);
  const totalAssetsValue = getTotalAssetsValue(assets);
  const totalMonthlyIncomes = getTestTotalMonthlyIncomes(incomes);
  const totalMonthlyDebts = getTestTotalMonthlyDebts(debts);
  const totalDebts = getTestTotalDebts(debts);
  const debtToIncomeRatio = getDebtToIncomeRatio(
    totalMonthlyDebts,
    totalMonthlyIncomes
  );
  const navigate = useNavigate();

  const sizeRenderer = useBreakpointValue({
    base: true,
    large: false,
  });

  return (
    <Flex width="auto" direction="column">
      <Button
        width="fit-content"
        onClick={() => {
          navigate('../');
        }}
      >
        Go back
      </Button>
      <GeneralInfoTable
        status={application?.status}
        submittedDate={application?.submittedDate}
      />
      <ApplicantInfoTable applicantInfo={applicantInfos[0]} />
      <ChecklistTable
        questions={habitat?.props?.prePreScreen?.prePreScreenQuestions}
        answers={checklists[0]?.props || {}}
      />
      <WrittenTable
        questions={habitat?.props?.prePreScreen?.prePreScreenWrittenQuestions}
        answers={writtens[0]?.props || {}}
      />
      <RecordsTable
        questions={habitat?.props?.prePreScreen?.prePreScreenRecords}
        answers={records[0]?.props || {}}
      />
      {/* <HouseholdList items={members} {...commonListProps} /> */}
      <HouseholdTable members={members} />
      <EmploymentTable employmentInfo={employmentInfos[0]} />
      <FinancialInfoSection
        applicantInfo={applicantInfos[0]}
        members={members}
        incomes={incomes}
        debts={debts}
        assets={assets}
        sizeRenderer={sizeRenderer}
      />
      <ApplicationMetricsTable
        totalMonthlyIncomes={totalMonthlyIncomes}
        totalAssets={totalAssetsValue}
        totalMonthlyDebts={totalMonthlyDebts}
        totalDebts={totalDebts}
        debtToIncomeRatio={debtToIncomeRatio}
      />

      <Button onClick={() => {}}>Accept</Button>
      <Button onClick={() => {}}>Reject</Button>
    </Flex>
  );
};

export default TestApplicationDetails;
