import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import {
  formatNumberAsCurrency,
  formatNumberAsPercentage,
  formatYesNoBoolean,
} from 'utils/formatters';

export function ApplicationMetricsTable({
  totalMonthlyIncomes,
  totalSavings,
  totalMonthlyDebts,
  debtToIncomeRatio,
  ami,
  isWithinAmiRange,
}) {
  const applicantData = [
    {
      header: 'Total Monthly Income',
      value: formatNumberAsCurrency(totalMonthlyIncomes ?? 0),
    },
    {
      header: 'Total Savings',
      value: formatNumberAsCurrency(totalSavings ?? 0),
    },
    {
      header: 'Total Monthly Debt',
      value: formatNumberAsCurrency(totalMonthlyDebts ?? 0),
    },
    {
      header: 'Debt to Income Ratio',
      value: formatNumberAsPercentage(debtToIncomeRatio ?? 0),
    },
    {
      header: 'AMI Range',
      value: ami ?? '-',
    },
    {
      header: 'Within AMI Range',
      value: formatYesNoBoolean(isWithinAmiRange),
    },
  ];

  return <DataTable heading="Applicant Information" data={applicantData} />;
}

ApplicationMetricsTable.propTypes = {
  totalMonthlyIncomes: PropTypes.number,
  totalSavings: PropTypes.number,
  totalMonthlyDebts: PropTypes.number,
  debtToIncomeRatio: PropTypes.number,
  ami: PropTypes.string,
  isWithinAmiRange: PropTypes.bool,
};
