import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { formatSexValue } from 'utils/formatters';

export function ApplicantInfoTable({ userProps }) {
  const applicantData = [
    {
      header: 'Name',
      value: userProps?.name ?? '',
    },
    {
      header: 'Date of Birth',
      value: userProps?.dob ?? '',
    },
    {
      header: 'Sex',
      value: formatSexValue(userProps?.sex ?? ''),
    },
    {
      header: 'Phone Number',
      value: userProps?.phone ?? '',
    },
    {
      header: 'Address',
      value: userProps?.address ?? '',
    },
    {
      header: 'Zip',
      value: userProps?.zip?.toString() ?? '',
    },
    {
      header: 'Email',
      value: userProps?.email ?? '',
    },
  ];

  return <DataTable heading="Applicant Information" data={applicantData} />;
}

ApplicantInfoTable.propTypes = {
  userProps: PropTypes.object,
};
