import PropTypes from 'prop-types';
import {
  Heading,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Flex,
} from '@aws-amplify/ui-react';

export function DataTable({ heading, data }) {
  return (
    <Flex direction="column">
      <Heading level="3" textAlign="center">
        {heading}
      </Heading>

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
  heading: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};
