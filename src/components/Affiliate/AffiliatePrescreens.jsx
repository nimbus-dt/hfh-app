/* eslint-disable react/prop-types */
import { Auth, DataStore } from 'aws-amplify';
import {
  Flex,
  Heading,
  Text,
  Divider,
  Card,
  Link,
  SelectField,
  Collection,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Application } from '../../models';
import { HouseholdList } from '../PreScreen/Form/Household/HouseholdList';
import { IncomeList } from '../PreScreen/Form/Income/IncomeList';
import { SavingsList } from '../PreScreen/Form/Savings/SavingsList';
import { DebtList } from '../PreScreen/Form/Debt/DebtList';
import { AffiliateEmail } from './AffiliateEmail';

export function AffiliatePrescreens({ prescreens }) {
  const [formData, setFormData] = useState({});
  const [userDataBool, setUserDataBool] = useState(false);
  const [userID, setUserID] = useState('');
  const [previousDataId, setPreviousDataId] = useState(null);
  const [status, setStatus] = useState('ALL');
  const [filteredPrescreens, setFilteredPrescreens] = useState(prescreens);
  const [page, setPage] = useState('allPrescreens');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    function filterPrescreens() {
      if (status !== 'ALL') {
        const newPrescreens = prescreens.filter(
          (prescreen) => prescreen.submittedStatus === status
        );
        setFilteredPrescreens(newPrescreens);
      } else {
        setFilteredPrescreens(prescreens);
      }
    }
    filterPrescreens();
  }, [prescreens, status]);

  useEffect(() => {
    async function setApplicationChildren() {
      try {
        const householdMemberArray =
          await selectedApplication?.HouseholdMembers.toArray();
        const incomeArray = await selectedApplication?.IncomeRecords.toArray();
        const savingArray = await selectedApplication?.SavingRecords.toArray();
        const debtArray = await selectedApplication?.DebtRecords.toArray();

        setHouseholdMembers(householdMemberArray);
        setIncomes(incomeArray);
        setSavings(savingArray);
        setDebts(debtArray);
      } catch (error) {
        console.log(`Error fetching application children: ${error}`);
      }
    }
    setApplicationChildren();
  }, [selectedApplication]);

  const allPrescreens = (
    <Flex direction="column" width="100%" alignContent="center">
      <Flex direction="row" width="100%" marginLeft="0">
        <SelectField
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </SelectField>
        <Badge>
          <Flex alignItems="center">Total: {filteredPrescreens.length}</Flex>
        </Badge>
      </Flex>
      <Heading level={3} fontWeight="bold" textAlign="center">
        PreScreens
      </Heading>
      <Divider />
      <Collection
        width="100%"
        type="grid"
        gap="15px"
        items={filteredPrescreens}
        isSearchable
        isPaginated
        itemsPerPage={5}
        searchPlaceholder="Type to search..."
        searchFilter={(item, keyword) =>
          item.ownerName &&
          item.ownerName.toLowerCase().includes(keyword.toLowerCase())
        }
      >
        {(item, index) => (
          <Flex width="auto" direction="column">
            <Table caption="" highlightOnHover variation="bordered">
              <TableBody>
                <TableRow>
                  <TableCell as="th" width="25%">
                    Name
                  </TableCell>
                  <TableCell as="th" width="25%">
                    Date Submitted
                  </TableCell>
                  <TableCell as="th" width="25%">
                    Status
                  </TableCell>
                  <TableCell as="th" width="25%" />
                </TableRow>
                <TableRow>
                  <TableCell>{item.ownerName}</TableCell>
                  <TableCell>{item.dateSubmitted}</TableCell>
                  <TableCell>{item.submittedStatus}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setPage('prescreenDetail');
                        setSelectedApplication(item);
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
                {/* Rest of the table rows */}
              </TableBody>
            </Table>

            {/* Rest of the content */}
          </Flex>
        )}
      </Collection>
    </Flex>
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

  const prescreenDetail = (
    <Flex width="auto" direction="column">
      <Button
        width="fit-content"
        onClick={() => {
          setPage('allPrescreens');
        }}
      >
        Go back
      </Button>
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
            <TableCell as="th" colSpan="2">
              <Heading level="3" textAlign="center">
                Household Information
              </Heading>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell colSpan="2">
              <HouseholdList items={householdMembers} />
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
              <IncomeList items={incomes} />
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
              <DebtList items={debts} />
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
              <SavingsList items={savings} />
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
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Total Savings
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Total Monthly Debt
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Total Non-monthly Debt
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Debt to Income Ratio
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              AMI Range
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
          <TableRow>
            <TableCell as="th" width="25%">
              Within AMI Range
            </TableCell>
            <TableCell>Orange</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Button onClick={() => updateApplication('ACCEPTED')}>Accept</Button>
      <Button onClick={() => updateApplication('REJECTED')}>Reject</Button>
    </Flex>
  );

  return (
    <>
      {page === 'allPrescreens' && allPrescreens}
      {page === 'prescreenDetail' && prescreenDetail}
    </>
  );
}
