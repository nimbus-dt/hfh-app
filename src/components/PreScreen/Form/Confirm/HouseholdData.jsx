@ -1,23 +1,22 @@
/* eslint-disable react/prop-types */
import { DataStore } from 'aws-amplify';
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
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { Application } from '../../models';
import { AffiliatePrescreenDetail } from './AffiliatePrescreenDetail';
import { HouseholdList } from '../PreScreen/Form/Household/HouseholdList';
import { IncomeList } from '../PreScreen/Form/Income/IncomeList';
import { SavingsList } from '../PreScreen/Form/Savings/SavingsList';
@ -28,6 +27,10 @@ export function AffiliatePrescreens({ prescreens }) {
  const [filteredPrescreens, setFilteredPrescreens] = useState(prescreens);
  const [page, setPage] = useState('allPrescreens');
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [householdMembers, setHouseholdMembers] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [savings, setSavings] = useState([]);
  const [debts, setDebts] = useState([]);

  useEffect(() => {
    function filterPrescreens() {
@ -43,6 +46,26 @@ export function AffiliatePrescreens({ prescreens }) {
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
@ -169,7 +192,7 @@ export function AffiliatePrescreens({ prescreens }) {

          <TableRow>
            <TableCell colSpan="2">
              <HouseholdList />
              <HouseholdList items={householdMembers} />
            </TableCell>
          </TableRow>

@ -183,7 +206,7 @@ export function AffiliatePrescreens({ prescreens }) {

          <TableRow>
            <TableCell colSpan="2">
              <IncomeList />
              <IncomeList items={incomes} />
            </TableCell>
          </TableRow>

@ -197,73 +220,87 @@

          <TableRow>
            <TableCell colSpan="2">
              <DebtList />
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
