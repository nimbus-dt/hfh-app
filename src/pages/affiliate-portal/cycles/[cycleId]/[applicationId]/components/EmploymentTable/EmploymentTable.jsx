import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { Flex } from '@aws-amplify/ui-react';
import { getStateName } from 'utils/misc';

const EmploymentTable = ({ employmentInfo, applicantInfo }) => (
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
            header: 'Street',
            value:
              employmentInfo?.props?.currentEmployment?.employerStreet ?? '',
          },
          {
            header: 'Zip code',
            value:
              employmentInfo?.props?.currentEmployment?.employerZipCode ?? '',
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
            header: 'Street',
            value:
              employmentInfo?.props?.previousEmployment?.employerStreet ?? '',
          },
          {
            header: 'Zip code',
            value:
              employmentInfo?.props?.previousEmployment?.employerZipCode ?? '',
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
    {applicantInfo?.props?.hasCoApplicant === 'Yes' && (
      <>
        <DataTable
          heading="Co-applicant's Employment Information"
          subheading="Current status"
          headingTextAlign="left"
          subheadingTextAlign="left"
          divider
          data={[
            {
              header: 'Unemployed',
              value:
                employmentInfo?.props?.coApplicantCurrentlyUnemployed ?? '',
            },
          ]}
        />
        {employmentInfo?.props?.coApplicantCurrentEmployment && (
          <DataTable
            subheading="Current employment"
            subheadingTextAlign="left"
            divider
            data={[
              {
                header: 'Name of current employer',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.employerName ?? '',
              },
              {
                header: 'State',
                value: getStateName(
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.employerState
                ),
              },
              {
                header: 'City',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.employerCity ?? '',
              },
              {
                header: 'Street',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.employerStreet ?? '',
              },
              {
                header: 'Zip code',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.employerZipCode ?? '',
              },
              {
                header: 'Approximate start date with this employer',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.startDate ?? '',
              },
              {
                header: 'Type of business',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.businessType ?? '',
              },
              {
                header: 'Business phone',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.businessPhone ?? '',
              },
              {
                header: 'First job',
                value:
                  employmentInfo?.props?.coApplicantCurrentEmployment
                    ?.firstJob ?? '',
              },
            ]}
          />
        )}
        {employmentInfo?.props?.coApplicantPreviousEmployment && (
          <DataTable
            subheading="Previous employment"
            subheadingTextAlign="left"
            divider
            data={[
              {
                header: 'Name of previous employer',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.employerName ?? '',
              },
              {
                header: 'State',
                value: getStateName(
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.employerState
                ),
              },
              {
                header: 'City',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.employerCity ?? '',
              },
              {
                header: 'Street',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.employerStreet ?? '',
              },
              {
                header: 'Zip code',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.employerZipCode ?? '',
              },
              {
                header: 'Approximate start date with this employer',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.startDate ?? '',
              },
              {
                header: 'Approximate end date with this employer',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.endDate ?? '',
              },
              {
                header: 'Type of business',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.businessType ?? '',
              },
              {
                header: 'Business phone',
                value:
                  employmentInfo?.props?.coApplicantPreviousEmployment
                    ?.businessPhone ?? '',
              },
            ]}
          />
        )}
      </>
    )}
  </Flex>
);

EmploymentTable.propTypes = {
  employmentInfo: PropTypes.object,
  applicantInfo: PropTypes.object,
};

export default EmploymentTable;
