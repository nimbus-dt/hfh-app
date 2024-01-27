import PropTypes from 'prop-types';
import {
  Heading,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Flex,
  Divider,
} from '@aws-amplify/ui-react';

export function DataTable({
  heading,
  subheading,
  data,
  headingTextAlign = 'center',
  subheadingTextAlign = 'center',
  divider,
}) {
  return (
    <Flex direction="column">
      {heading && (
        <>
          <Heading level="3" textAlign={headingTextAlign}>
            {heading}
          </Heading>
          {divider && <Divider />}
        </>
      )}
      {subheading && (
        <Heading marginTop="1rem" level="4" textAlign={subheadingTextAlign}>
          {subheading}
        </Heading>
      )}

      <Table caption="" highlightOnHover variation="bordered">
        <TableBody>
          {data.map(({ header, value }) => (
            <TableRow key={header}>
              <TableCell
                as="th"
                width={{ base: '50%', medium: '25%' }}
                style={{ wordBreak: 'break-word' }}
              >
                {header}
              </TableCell>
              <TableCell style={{ wordBreak: 'break-word' }}>{value}</TableCell>
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
  headingTextAlign: PropTypes.string,
  subheadingTextAlign: PropTypes.string,
  divider: PropTypes.bool,
};
