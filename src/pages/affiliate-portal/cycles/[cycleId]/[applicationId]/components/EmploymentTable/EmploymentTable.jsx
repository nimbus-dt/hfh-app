import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { Flex } from '@aws-amplify/ui-react';
import { getStateName } from 'utils/misc';

const EmploymentTable = ({ employmentInfo }) => (
  <Flex direction="column">
    <DataTable
      heading="Employment Information"
      subheading="Current status"
      headingTextAlign="left"
      subheadingTextAlign="left"
      divider
      data={[
        {
          header: 'Unemployed',
          value: employmentInfo?.props?.currentlyUnemployed ?? '',
        },
      ]}
    />
    {employmentInfo?.props?.currentEmployment && (
      <DataTable
        subheading="Current employment"
        subheadingTextAlign="left"
        divider
        data={[
          {
            header: 'Name of current employer',
            value: employmentInfo?.props?.currentEmployment?.employerName ?? '',
          },
          {
            header: 'Street address of current employer',
            value:
              employmentInfo?.props?.currentEmployment?.employerStreet ?? '',
          },
          {
            header: 'State',
            value: getStateName(
              employmentInfo?.props?.currentEmployment?.employerState
            ),
          },
          {
            header: 'City',
            value: employmentInfo?.props?.currentEmployment?.employerCity ?? '',
          },
          {
            header: 'Approximate start date with this employer',
            value: employmentInfo?.props?.currentEmployment?.startDate ?? '',
          },
          {
            header: 'Type of business',
            value: employmentInfo?.props?.currentEmployment?.businessType ?? '',
          },
          {
            header: 'Business phone',
            value:
              employmentInfo?.props?.currentEmployment?.businessPhone ?? '',
          },
          {
            header: 'First job',
            value: employmentInfo?.props?.currentEmployment?.firstJob ?? '',
          },
        ]}
      />
    )}
    {employmentInfo?.props?.previousEmployment && (
      <DataTable
        subheading="Previous employment"
        subheadingTextAlign="left"
        divider
        data={[
          {
            header: 'Name of previous employer',
            value:
              employmentInfo?.props?.previousEmployment?.employerName ?? '',
          },
          {
            header: 'Street address of previous employer',
            value:
              employmentInfo?.props?.previousEmployment?.employerStreet ?? '',
          },
          {
            header: 'State',
            value: getStateName(
              employmentInfo?.props?.previousEmployment?.employerState
            ),
          },
          {
            header: 'City',
            value:
              employmentInfo?.props?.previousEmployment?.employerCity ?? '',
          },
          {
            header: 'Approximate start date with this employer',
            value: employmentInfo?.props?.previousEmployment?.startDate ?? '',
          },
          {
            header: 'Approximate end date with this employer',
            value: employmentInfo?.props?.previousEmployment?.endDate ?? '',
          },
          {
            header: 'Type of business',
            value:
              employmentInfo?.props?.previousEmployment?.businessType ?? '',
          },
          {
            header: 'Business phone',
            value:
              employmentInfo?.props?.previousEmployment?.businessPhone ?? '',
          },
        ]}
      />
    )}
  </Flex>
);

EmploymentTable.propTypes = {
  employmentInfo: PropTypes.object,
};

export default EmploymentTable;
