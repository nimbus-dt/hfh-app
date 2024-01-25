import PropTypes from 'prop-types';
import {
  Heading,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Flex,
} from '@aws-amplify/ui-react';

export function DataTable({ heading, subheading, data }) {
  return (
    <Flex direction="column">
      {heading && (
        <Heading level="3" textAlign="center">
          {heading}
        </Heading>
      )}
      {subheading && (
        <Heading level="4" textAlign="center">
          {subheading}
        </Heading>
      )}

      <Table caption="" highlightOnHover variation="bordered">
        <TableBody>
          {data.map(({ header, value }) => (
            <TableRow key={header}>
              <TableCell as="th" width="25%">
                {header}
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Flex>
  );
}

DataTable.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      value: PropTypes.node,
    })
  ).isRequired,
};
