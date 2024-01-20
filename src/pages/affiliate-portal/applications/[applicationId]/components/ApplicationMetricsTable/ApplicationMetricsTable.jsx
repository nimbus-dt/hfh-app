import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import {
  formatNumberAsCurrency,
  formatNumberAsPercentage,
} from 'utils/formatters';

export function ApplicationMetricsTable({
  totalMonthlyIncomes,
  totalAssets,
  totalMonthlyDebts,
  totalDebts,
  debtToIncomeRatio,
}) {
  const applicantData = [
    {
      header: 'Total Monthly Household Income',
      value: formatNumberAsCurrency(totalMonthlyIncomes ?? 0),
    },
    {
      header: 'Total Monthly Household Debt',
      value: formatNumberAsCurrency(totalMonthlyDebts ?? 0),
    },
    {
      header: 'Total household Debt',
      value: formatNumberAsCurrency(totalDebts ?? 0),
    },
    {
      header: 'Total Household Asset Value',
      value: formatNumberAsCurrency(totalAssets ?? 0),
    },
    {
      header: 'Debt to Income Ratio',
      value: formatNumberAsPercentage(debtToIncomeRatio ?? 0),
    },
  ];

  return <DataTable heading="Applicant Information" data={applicantData} />;
}

ApplicationMetricsTable.propTypes = {
  totalMonthlyIncomes: PropTypes.number,
  totalAssets: PropTypes.number,
  totalMonthlyDebts: PropTypes.number,
  totalDebts: PropTypes.number,
  debtToIncomeRatio: PropTypes.number,
};
