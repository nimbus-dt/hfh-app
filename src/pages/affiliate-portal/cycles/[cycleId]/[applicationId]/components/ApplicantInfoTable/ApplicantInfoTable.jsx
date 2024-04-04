import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { Flex } from '@aws-amplify/ui-react';
import { getStateName } from 'utils/misc';
import { creditTypes } from 'pages/homeownership/[habitat]/applicant-info/HomeownershipApplicantInfoPage.schema';

const ApplicantInfoTable = ({
  applicantInfo,
  email,
  shouldRenderCoApplicant,
  shouldRenderTypeOfOwnership,
  coApplicantMember,
}) => (
  <Flex direction="column">
    <DataTable
      heading="Applicant Information"
      subheading="Basic information"
      headingTextAlign="left"
      subheadingTextAlign="left"
      divider
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
          header: 'Date of birth',
          value: applicantInfo?.props?.basicInfo?.birthDate ?? '',
        },
        {
          header: 'Marital status',
          value: applicantInfo?.props?.basicInfo?.maritalStatus ?? '',
        },
        {
          header: 'Email',
          value: email ?? '',
        },
      ]}
    />
    {applicantInfo?.props?.unmarriedAddendum && (
      <DataTable
        subheading="Unmarried Addendum"
        subheadingTextAlign="left"
        divider
        data={[
          {
            header:
              'Is there a person who is not your legal spouse but who currently has real property rights similar to those of a legal spouse?',
            value:
              applicantInfo?.props?.unmarriedAddendum
                ?.notSpouseButSimilarPropertyRights ?? '',
          },
          ...(applicantInfo?.props?.unmarriedAddendum
            ?.notSpouseButSimilarPropertyRights === 'Yes'
            ? [
                {
                  header: 'Indicate the type of relationship',
                  value:
                    applicantInfo?.props?.unmarriedAddendum?.relationshipType ??
                    '',
                },
                ...(applicantInfo?.props?.unmarriedAddendum
                  ?.relationshipType === 'Other'
                  ? [
                      {
                        header: 'Explain the relationship',
                        value:
                          applicantInfo?.props?.unmarriedAddendum
                            ?.otherRelationshipType ?? '',
                      },
                    ]
                  : []),
                {
                  header: 'State in which the relationship was formed',
                  value: applicantInfo?.props?.unmarriedAddendum?.state ?? '',
                },
              ]
            : []),
        ]}
      />
    )}
    <DataTable
      subheading="Current address"
      subheadingTextAlign="left"
      data={[
        {
          header: 'State',
          value: getStateName(applicantInfo?.props?.currentAddress?.state),
        },
        {
          header: 'City',
          value: applicantInfo?.props?.currentAddress?.city ?? '',
        },
        {
          header: 'Street',
          value: applicantInfo?.props?.currentAddress?.street ?? '',
        },
        {
          header: 'Zip code',
          value: applicantInfo?.props?.currentAddress?.zipCode ?? '',
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
        subheadingTextAlign="left"
        divider
        data={[
          {
            header: 'State',
            value: getStateName(applicantInfo?.props?.previousAddress?.state),
          },
          {
            header: 'City',
            value: applicantInfo?.props?.previousAddress?.city ?? '',
          },
          {
            header: 'Street',
            value: applicantInfo?.props?.previousAddress?.street ?? '',
          },
          {
            header: 'Zip code',
            value: applicantInfo?.props?.previousAddress?.zipCode ?? '',
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
    {!shouldRenderCoApplicant && shouldRenderTypeOfOwnership && (
      <DataTable
        subheading="Type of ownership"
        subheadingTextAlign="left"
        data={[
          {
            header: 'Ownership type',
            value: applicantInfo?.props?.typeOfOwnership?.ownershipType ?? '',
          },
        ]}
      />
    )}
    {shouldRenderCoApplicant && (
      <>
        <DataTable
          subheading="Type of credit"
          subheadingTextAlign="left"
          data={[
            {
              header: 'Credit type',
              value: applicantInfo?.props?.typeOfCredit?.creditType ?? '',
            },
            ...(applicantInfo?.props.typeOfCredit?.creditType === creditTypes[1]
              ? [
                  {
                    header: 'Total number of borrowers:',
                    value:
                      applicantInfo?.props?.typeOfCredit
                        ?.totalNumberOfBorrowers ?? '',
                  },
                ]
              : []),
            ...(applicantInfo?.props.typeOfCredit?.creditType === creditTypes[2]
              ? [
                  {
                    header: 'Your initials:',
                    value:
                      applicantInfo?.props?.typeOfCredit?.yourInitials ?? '',
                  },
                ]
              : []),
          ]}
        />
        {shouldRenderTypeOfOwnership && (
          <DataTable
            subheading="Type of ownership"
            subheadingTextAlign="left"
            data={[
              {
                header: 'Ownership type',
                value:
                  applicantInfo?.props?.typeOfOwnership?.ownershipType ?? '',
              },
            ]}
          />
        )}
        <DataTable
          subheading="Co-applicant"
          subheadingTextAlign="left"
          data={[
            {
              header: 'Do you have a co-applicant?',
              value: applicantInfo?.props?.hasCoApplicant ?? '',
            },
          ]}
        />
        {applicantInfo?.props?.hasCoApplicant === 'Yes' && (
          <>
            <DataTable
              heading="Co-applicant Information"
              subheading="Co-applicant Basic information"
              headingTextAlign="left"
              subheadingTextAlign="left"
              divider
              data={[
                {
                  header: 'Full name',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.fullName ?? '',
                },
                {
                  header: 'Alternative/Former name',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo
                      ?.altOrFormerName ?? '',
                },
                {
                  header: 'Social security number',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo
                      ?.socialSecurityNumber ?? '',
                },
                {
                  header: 'Home phone number',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.homePhone ?? '',
                },
                {
                  header: 'Cell phone number',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.cellPhone ?? '',
                },
                {
                  header: 'Work phone number',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.workPhone ?? '',
                },

                {
                  header: 'Date of birth',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.birthDate ?? '',
                },
                {
                  header: 'Marital status',
                  value:
                    applicantInfo?.props?.coApplicantBasicInfo?.maritalStatus ??
                    '',
                },
                {
                  header: 'Sex',
                  value: coApplicantMember?.props?.sex ?? '',
                },
                {
                  header: 'Relationship',
                  value: coApplicantMember?.props?.relationship ?? '',
                },
              ]}
            />
            {applicantInfo?.props?.coApplicantUnmarriedAddendum && (
              <DataTable
                subheading="Co-applicant Unmarried Addendum"
                subheadingTextAlign="left"
                divider
                data={[
                  {
                    header:
                      "Is there a person who is not the co-applicant's legal spouse but who currently has real property rights similar to those of a legal spouse?",
                    value:
                      applicantInfo?.props?.coApplicantUnmarriedAddendum
                        ?.notSpouseButSimilarPropertyRights ?? '',
                  },
                  ...(applicantInfo?.props?.coApplicantUnmarriedAddendum
                    ?.notSpouseButSimilarPropertyRights === 'Yes'
                    ? [
                        {
                          header: 'Indicate the type of relationship',
                          value:
                            applicantInfo?.props?.coApplicantUnmarriedAddendum
                              ?.relationshipType ?? '',
                        },
                        ...(applicantInfo?.props?.coApplicantUnmarriedAddendum
                          ?.relationshipType === 'Other'
                          ? [
                              {
                                header: 'Explain the relationship',
                                value:
                                  applicantInfo?.props
                                    ?.coApplicantUnmarriedAddendum
                                    ?.otherRelationshipType ?? '',
                              },
                            ]
                          : []),
                        {
                          header: 'State in which the relationship was formed',
                          value:
                            applicantInfo?.props?.coApplicantUnmarriedAddendum
                              ?.state ?? '',
                        },
                      ]
                    : []),
                ]}
              />
            )}
            <DataTable
              subheading="Co-applicant Current address"
              subheadingTextAlign="left"
              data={[
                {
                  header: 'State',
                  value: getStateName(
                    applicantInfo?.props?.coApplicantCurrentAddress?.state
                  ),
                },
                {
                  header: 'City',
                  value:
                    applicantInfo?.props?.coApplicantCurrentAddress?.city ?? '',
                },
                {
                  header: 'Street',
                  value:
                    applicantInfo?.props?.coApplicantCurrentAddress?.street ??
                    '',
                },
                {
                  header: 'Zip code',
                  value:
                    applicantInfo?.props?.coApplicantCurrentAddress?.zipCode ??
                    '',
                },
                {
                  header: 'Months lived at this address',
                  value:
                    applicantInfo?.props?.coApplicantCurrentAddress
                      ?.monthsLivedHere ?? '',
                },
                {
                  header: 'Ownership status',
                  value:
                    applicantInfo?.props?.coApplicantCurrentAddress
                      ?.ownershipStatus ?? '',
                },
              ]}
            />
            {applicantInfo?.props?.coApplicantPreviousAddress && (
              <DataTable
                subheading="Co-Applicant Previous address"
                subheadingTextAlign="left"
                divider
                data={[
                  {
                    header: 'State',
                    value: getStateName(
                      applicantInfo?.props?.coApplicantPreviousAddress?.state
                    ),
                  },
                  {
                    header: 'City',
                    value:
                      applicantInfo?.props?.coApplicantPreviousAddress?.city ??
                      '',
                  },
                  {
                    header: 'Street',
                    value:
                      applicantInfo?.props?.coApplicantPreviousAddress
                        ?.street ?? '',
                  },
                  {
                    header: 'Zip code',
                    value:
                      applicantInfo?.props?.coApplicantPreviousAddress
                        ?.zipCode ?? '',
                  },
                  {
                    header: 'Months lived at this address',
                    value:
                      applicantInfo?.props?.coApplicantPreviousAddress
                        ?.monthsLivedHere ?? '',
                  },
                  {
                    header: 'Ownership status',
                    value:
                      applicantInfo?.props?.coApplicantPreviousAddress
                        ?.ownershipStatus ?? '',
                  },
                ]}
              />
            )}
          </>
        )}
      </>
    )}
  </Flex>
);

ApplicantInfoTable.propTypes = {
  applicantInfo: PropTypes.object,
  email: PropTypes.string,
  shouldRenderCoApplicant: PropTypes.bool,
  shouldRenderTypeOfOwnership: PropTypes.bool,
  coApplicantMember: PropTypes.object,
};

export default ApplicantInfoTable;
