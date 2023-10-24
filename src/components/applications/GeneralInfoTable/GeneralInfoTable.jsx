import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { formatSubmittedStatus } from 'utils/formatters';

export function GeneralInfoTable({
  dateSubmitted,
  submittedStatus,
  habitatRevisor,
  dateRevised,
}) {
  const data = [
    { header: 'Date Submitted', value: dateSubmitted ?? '' },
    { header: 'Status', value: formatSubmittedStatus(submittedStatus ?? '') },
    { header: 'Revisor', value: habitatRevisor ?? '' },
    { header: 'Date Revised', value: dateRevised ?? '' },
  ];

  return <DataTable heading="General Information" data={data} />;
}

GeneralInfoTable.propTypes = {
  dateSubmitted: PropTypes.string,
  submittedStatus: PropTypes.string,
  habitatRevisor: PropTypes.string,
  dateRevised: PropTypes.string,
};
