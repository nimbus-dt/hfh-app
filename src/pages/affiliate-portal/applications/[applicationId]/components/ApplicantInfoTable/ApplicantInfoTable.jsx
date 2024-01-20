import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';

const ApplicantInfoTable = ({ applicantInfo }) => (
  <>
    <DataTable
      heading="Applicant Information"
      subheading="Basic information"
      data={[
        {
          header: 'Full name',
          value: applicantInfo?.props?.basicInfo?.fullName ?? '',
        },
        {
          header: 'Alternative/Former name',
          value: applicantInfo?.props?.basicInfo?.altOrFormerName ?? '',
        },
        {
          header: 'Social security number',
          value: applicantInfo?.props?.basicInfo?.socialSecurityNumber ?? '',
        },
        {
          header: 'Home phone number',
          value: applicantInfo?.props?.basicInfo?.homePhone ?? '',
        },
        {
          header: 'Cell phone number',
          value: applicantInfo?.props?.basicInfo?.cellPhone ?? '',
        },
        {
          header: 'Work phone number',
          value: applicantInfo?.props?.basicInfo?.workPhone ?? '',
        },
        {
          header: 'Age',
          value: applicantInfo?.props?.basicInfo?.age ?? '',
        },
        {
          header: 'Date of birth',
          value: applicantInfo?.props?.basicInfo?.birthDate ?? '',
        },
        {
          header: 'Marital status',
          value: applicantInfo?.props?.basicInfo?.maritalStatus ?? '',
        },
      ]}
    />
    <DataTable
      subheading="Current address"
      data={[
        {
          header: 'Address',
          value: applicantInfo?.props?.currentAddress?.address ?? '',
        },
        {
          header: 'Months lived at this address',
          value: applicantInfo?.props?.currentAddress?.monthsLivedHere ?? '',
        },
        {
          header: 'Ownership status',
          value: applicantInfo?.props?.currentAddress?.ownershipStatus ?? '',
        },
      ]}
    />
    {applicantInfo?.props?.previousAddress && (
      <DataTable
        subheading="Previous address"
        data={[
          {
            header: 'Address',
            value: applicantInfo?.props?.previousAddress?.address ?? '',
          },
          {
            header: 'Months lived at this address',
            value: applicantInfo?.props?.previousAddress?.monthsLivedHere ?? '',
          },
          {
            header: 'Ownership status',
            value: applicantInfo?.props?.previousAddress?.ownershipStatus ?? '',
          },
        ]}
      />
    )}
  </>
);

ApplicantInfoTable.propTypes = {
  applicantInfo: PropTypes.object,
};

export default ApplicantInfoTable;
