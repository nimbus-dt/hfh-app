import { Auth, DataStore } from 'aws-amplify';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {
  Flex,
  Heading,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { useEffect, useMemo, useState } from 'react';
import { Application, UserProps } from 'models';
import { HouseholdList } from 'components/PreScreen/Form/Household/HouseholdList';
import { IncomeList } from 'components/PreScreen/Form/Income/IncomeList';
import { SavingsList } from 'components/PreScreen/Form/Savings/SavingsList';
import { DebtList } from 'components/PreScreen/Form/Debt/DebtList';
import GeneralInfoTable from 'components/applications/GeneralInfoTable';
import {
  useApplicationById,
  useDebtRecordsQuery,
  useHouseholdMembersQuery,
  useIncomeRecordsQuery,
  useSavingRecordsQuery,
} from 'hooks/services';
import { calculateMetrics } from './calculateMetrics';

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
  const totalMembers = householdMembers.length + 1;
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');
  const [previousDataId, setPreviousDataId] = useState(null);
  const navigate = useNavigate();
  console.count('counter');

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const {
    totalMonthlyIncomes,
    totalSavings,
    totalMonthlyDebts,
    debtToIncomeRatio,
    ami,
    amiRange,
  } = useMemo(
    () =>
      calculateMetrics({
        selectedApplication,
        householdMembers,
        savings,
        incomes,
        debts,
        habitat,
        totalMembers,
      }),
    [
      selectedApplication,
      householdMembers,
      savings,
      incomes,
      debts,
      habitat,
      totalMembers,
    ]
  );

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
      <Table caption="" highlightOnHover variation="bordered">
        <TableBody>
          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                General Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" width="25%">
              Name
            </TableCell>
            <TableCell>{selectedApplication?.ownerName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Date Submitted
            </TableCell>
            <TableCell>{selectedApplication?.dateSubmitted}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Status
            </TableCell>
            <TableCell>{selectedApplication?.submittedStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Date Of Birth
            </TableCell>
            <TableCell>{userProps?.dob}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Sex
            </TableCell>
            <TableCell>{userProps?.sex}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Phone Number
            </TableCell>
            <TableCell>{userProps?.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Revisor
            </TableCell>
            <TableCell>{selectedApplication?.habitatRevisor}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Date revised
            </TableCell>
            <TableCell>{selectedApplication?.dateRevised}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Address
            </TableCell>
            <TableCell>{userProps?.address}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Household Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <HouseholdList
                items={householdMembers}
                sizeRenderer={responsiveBool}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Income Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <IncomeList
                items={incomes}
                application={selectedApplication}
                sizeRenderer={responsiveBool}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Debt Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <DebtList items={debts} sizeRenderer={responsiveBool} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Savings Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <SavingsList items={savings} sizeRenderer={responsiveBool} />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Metrics
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell as="th" width="25%">
              Total Monthly Income
            </TableCell>
            <TableCell>${totalMonthlyIncomes}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Total Savings
            </TableCell>
            <TableCell>${totalSavings}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Total Monthly Debt
            </TableCell>
            <TableCell>${totalMonthlyDebts}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Debt to Income Ratio
            </TableCell>
            <TableCell>{debtToIncomeRatio}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              AMI Range
            </TableCell>
            <TableCell>{ami}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Within AMI Range
            </TableCell>
            <TableCell>{amiRange}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button onClick={() => updateApplication('ACCEPTED')}>Accept</Button>
      <Button onClick={() => updateApplication('REJECTED')}>Reject</Button>
    </Flex>
  );
}
