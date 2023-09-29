import PropTypes from 'prop-types';
import {
  Flex,
  Heading,
  Table,
  TableBody,
  TableCell,
  TableRow,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import ApplicantInfoTable from 'components/applications/ApplicantInfoTable';
import { HouseholdList } from 'components/PreScreen/Form/Household/HouseholdList';
import { IncomeList } from 'components/PreScreen/Form/Income/IncomeList';
import { DebtList } from 'components/PreScreen/Form/Debt/DebtList';
import { SavingsList } from 'components/PreScreen/Form/Savings/SavingsList';

export function ApplicationSummary({
  selectedApplication,
  userProps,
  householdMembers,
  incomes,
  debts,
  savings,
}) {
  const sizeRenderer = useBreakpointValue({
    base: true,
    large: false,
  });
  const applicationListsSections = [
    {
      header: 'Household',
      ListComponent: (
        <HouseholdList items={householdMembers} sizeRenderer={sizeRenderer} />
      ),
    },
    {
      header: 'Savings',
      ListComponent: (
        <SavingsList items={savings} sizeRenderer={sizeRenderer} />
      ),
    },
    {
      header: 'Debt',
      ListComponent: <DebtList items={debts} sizeRenderer={sizeRenderer} />,
    },
    {
      header: 'Income',
      ListComponent: (
        <IncomeList
          items={incomes}
          application={selectedApplication}
          sizeRenderer={sizeRenderer}
        />
      ),
    },
  ];

  return (
    <Flex direction="column">
      <ApplicantInfoTable userProps={userProps} />

      {applicationListsSections.map((data) => (
        <Table
          key={data.header}
          caption=""
          highlightOnHover
          variation="bordered"
        >
          <TableBody>
            <TableRow>
              <TableCell as="th" colSpan="2">
                <Heading level="3" textAlign="center">
                  {data.header} Information
                </Heading>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan="2">{data.ListComponent}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Flex>
  );
}

ApplicationSummary.propTypes = {
  selectedApplication: PropTypes.object,
  userProps: PropTypes.object,
  householdMembers: PropTypes.array,
  incomes: PropTypes.array,
  debts: PropTypes.array,
  savings: PropTypes.array,
};
