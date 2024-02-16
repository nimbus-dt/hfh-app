import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { Flex } from '@aws-amplify/ui-react';
import { ETHNICITY_OPTIONS, RACE_OPTIONS } from 'utils/constants';

const objectOfBoolToArrayOfStrings = (boolObject, stringObject) => {
  if (!boolObject) {
    return [];
  }

  const stringArray = [];
  for (const [key, value] of Object.entries(boolObject)) {
    if (typeof value !== 'boolean' && value) {
      stringArray.push(boolObject[key]);
    } else if (value) {
      stringArray.push(stringObject[key]);
    }
  }
  return stringArray;
};

const ApplicantOptionalTable = ({ applicantOptional }) => (
  <Flex direction="column">
    <DataTable
      heading="Applicant Optional Information"
      subheading="Applicant Military Service"
      headingTextAlign="left"
      subheadingTextAlign="left"
      divider
      data={[
        {
          header:
            'Did you (or your deceased spouse) serve, or are you currently serving, in the United States Armed Forces?',
          value:
            applicantOptional?.props?.applicantMilitaryService
              ?.serveOrServedInUSAF ?? '',
        },
        ...(applicantOptional?.props?.applicantMilitaryService
          ?.serveOrServedInUSAF === 'Yes'
          ? [
              {
                header: 'Currently serving on active duty?',
                value:
                  applicantOptional?.props?.applicantMilitaryService
                    ?.currentlyServing ?? '',
              },
              ...(applicantOptional?.props?.applicantMilitaryService
                ?.currentlyServing === 'Yes'
                ? [
                    {
                      header: 'Projected expiration date of service/tour',
                      value:
                        applicantOptional?.props?.applicantMilitaryService
                          ?.projectedExpirationDateOfServiceTour ?? '',
                    },
                  ]
                : []),
              {
                header:
                  'Currently retired, discharged, or separted from service?',
                value:
                  applicantOptional?.props?.applicantMilitaryService
                    ?.currentlyRetiredDischargedOrSeparated ?? '',
              },
              {
                header:
                  'Only period of service was a non-activated member of the Reserve of National Guard?',
                value:
                  applicantOptional?.props?.applicantMilitaryService
                    ?.onlyPeriodWasNonActive ?? '',
              },
              {
                header: 'Surviving spouse?',
                value:
                  applicantOptional?.props?.applicantMilitaryService
                    ?.survivingSpouse ?? '',
              },
            ]
          : []),
      ]}
    />
    <DataTable
      subheading="Household Member Military Service"
      subheadingTextAlign="left"
      data={[
        {
          header:
            'Did you (or your deceased spouse) serve, or are you currently serving, in the United States Armed Forces?',
          value:
            applicantOptional?.props?.anyoneElseMilitaryService
              ?.serveOrServedInUSAF ?? '',
        },
        ...(applicantOptional?.props?.anyoneElseMilitaryService
          ?.serveOrServedInUSAF === 'Yes'
          ? [
              {
                header: 'Currently serving on active duty?',
                value:
                  applicantOptional?.props?.anyoneElseMilitaryService
                    ?.currentlyServing ?? '',
              },
              ...(applicantOptional?.props?.anyoneElseMilitaryService
                ?.currentlyServing === 'Yes'
                ? [
                    {
                      header: 'Projected expiration date of service/tour',
                      value:
                        applicantOptional?.props?.anyoneElseMilitaryService
                          ?.projectedExpirationDateOfServiceTour ?? '',
                    },
                  ]
                : []),
              {
                header:
                  'Currently retired, discharged, or separted from service?',
                value:
                  applicantOptional?.props?.anyoneElseMilitaryService
                    ?.currentlyRetiredDischargedOrSeparated ?? '',
              },
              {
                header:
                  'Only period of service was a non-activated member of the Reserve of National Guard?',
                value:
                  applicantOptional?.props?.anyoneElseMilitaryService
                    ?.onlyPeriodWasNonActive ?? '',
              },
            ]
          : []),
      ]}
    />

    <DataTable
      subheading="Demographic"
      subheadingTextAlign="left"
      divider
      data={[
        {
          header: 'Ethinicity',
          value: (
            <ul>
              {objectOfBoolToArrayOfStrings(
                applicantOptional?.props?.demographic?.ethnicity,
                ETHNICITY_OPTIONS
              ).map((ethnicity) => (
                <li>{ethnicity}</li>
              ))}
            </ul>
          ),
        },
        {
          header: 'Sex',
          value: applicantOptional?.props?.demographic?.sex ?? '',
        },
        {
          header: 'Race',
          value: (
            <ul>
              {objectOfBoolToArrayOfStrings(
                applicantOptional?.props?.demographic?.race,
                RACE_OPTIONS
              ).map((ethnicity) => (
                <li>{ethnicity}</li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  </Flex>
);

ApplicantOptionalTable.propTypes = {
  applicantOptional: PropTypes.object,
};

export default ApplicantOptionalTable;
