import PropTypes from 'prop-types';
import DataTable from 'components/DataTable';
import { Flex } from '@aws-amplify/ui-react';
import { formatNumberAsCurrency } from 'utils/formatters';

const PropertyTable = ({ property }) => (
  <Flex direction="column">
    <DataTable
      heading="Property"
      subheading="Real State Ownership"
      headingTextAlign="left"
      subheadingTextAlign="left"
      divider
      data={[
        {
          header: 'Do you own any real state?',
          value: property?.props?.ownRealState ?? '',
        },
      ]}
    />
    {property?.props?.ownRealState === 'Yes' && (
      <>
        <DataTable
          subheading="Mortgage Payment"
          subheadingTextAlign="left"
          divider
          data={[
            {
              header:
                'What is your montly mortgage payment (including taxes, insurance, etc.)?',
              value:
                formatNumberAsCurrency(
                  property?.props?.mortgagePayment?.montlyMortgage
                ) ?? '',
            },
            {
              header: 'Unpaid balance',
              value:
                formatNumberAsCurrency(
                  property?.props?.mortgagePayment?.unpaidBalance
                ) ?? '',
            },
          ]}
        />
        <DataTable
          subheading="Land Ownership"
          subheadingTextAlign="left"
          divider
          data={[
            {
              header: 'Do you own land other than your residence?',
              value: property?.props?.landOwnership?.ownLand ?? '',
            },
            ...(property?.props?.landOwnership?.ownLand === 'Yes'
              ? [
                  {
                    header:
                      'Montly mortgage payment (including taxes, insurance, etc.)',
                    value:
                      formatNumberAsCurrency(
                        property?.props?.landOwnership?.montlyPayment
                      ) ?? '',
                  },
                ]
              : []),
          ]}
        />
      </>
    )}
    {property?.props?.ownRealState === 'No' && (
      <DataTable
        subheading="Rent Payment"
        subheadingTextAlign="left"
        divider
        data={[
          {
            header: 'What is your montly rent payment?',
            value:
              formatNumberAsCurrency(
                property?.props?.rentPayment?.montlyRent
              ) ?? '',
          },
        ]}
      />
    )}
  </Flex>
);

PropertyTable.propTypes = {
  property: PropTypes.object,
};

export default PropertyTable;
