import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';

export function GeneralInfoTable({
  submittedDate,
  reviewStatus,
  submissionStatus,
}) {
  const data = [
    { header: 'Date Submitted', value: submittedDate ?? '' },
    { header: 'Submission Status', value: submissionStatus ?? '' },
    { header: 'Review Status', value: reviewStatus ?? '' },
  ];

  return (
    <DataTable
      heading="General Information"
      headingTextAlign="left"
      data={data}
      divider
    />
  );
}

GeneralInfoTable.propTypes = {
  submittedDate: PropTypes.string,
  reviewStatus: PropTypes.string,
  submissionStatus: PropTypes.string,
};
