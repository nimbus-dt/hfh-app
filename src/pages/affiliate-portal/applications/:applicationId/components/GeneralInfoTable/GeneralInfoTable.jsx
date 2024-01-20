import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';

export function GeneralInfoTable({ submittedDate, status }) {
  const data = [
    { header: 'Date Submitted', value: submittedDate ?? '' },
    { header: 'Status', value: status ?? '' },
  ];

  return <DataTable heading="General Information" data={data} />;
}

GeneralInfoTable.propTypes = {
  submittedDate: PropTypes.string,
  status: PropTypes.string,
};
