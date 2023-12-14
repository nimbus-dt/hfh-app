import { SortDirection } from 'aws-amplify';
import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  Flex,
  Heading,
  Divider,
  SelectField,
  Collection,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  useBreakpointValue,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import { APPLICATION_SUBMITTED_STATUS_LIST } from 'utils/constants';
import { useApplicationsQuery } from 'hooks/services';

const ALL_STATUS_KEY = 'ALL';
const STATUS_LIST = [
  {
    key: ALL_STATUS_KEY,
    value: 'All',
  },
  ...APPLICATION_SUBMITTED_STATUS_LIST,
];

export function AffiliatePrescreensPage() {
  const { habitat } = useOutletContext();
  const [status, setStatus] = useState(ALL_STATUS_KEY);
  const { data: prescreens } = useApplicationsQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        const criteriaArr = [
          c2.habitatID.eq(habitat.id),
          c2.submitted.eq(true),
        ];

        if (status !== ALL_STATUS_KEY) {
          return [...criteriaArr, c2.submittedStatus.eq(status)];
        }

        return criteriaArr;
      }),
    paginationProducer: {
      sort: (s) => s.dateSubmitted(SortDirection.DESCENDING),
    },
    dependencyArray: [status],
  });
  const navigate = useNavigate();
  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleApplicationClick = (application) => {
    navigate(`../applications/${application?.id}`);
  };

  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Heading level={3} fontWeight="bold" textAlign="center">
        PreScreens
      </Heading>
      <Divider />
      <Flex
        direction="row"
        width="100%"
        marginLeft="0"
        justifyContent={responsiveBool ? 'center' : 'left'}
      >
        <SelectField
          onChange={(event) => {
            setStatus(event.target.value);
          }}
        >
          {STATUS_LIST.map(({ key, value }) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </SelectField>

        <Badge>
          <Flex alignItems="center">Total: {prescreens.length}</Flex>
        </Badge>
      </Flex>
      <Collection
        width="100%"
        type="grid"
        gap="15px"
        items={prescreens}
        isSearchable
        isPaginated
        itemsPerPage={5}
        searchPlaceholder="Type to search..."
        searchFilter={(application, keyword) =>
          application.ownerName?.toLowerCase().includes(keyword.toLowerCase())
        }
      >
        {(application, index) => (
          <Flex
            key={index}
            width="auto"
            direction="column"
            justifyContent="center"
          >
            <Table
              caption=""
              highlightOnHover
              variation="bordered"
              justify-content="center"
              size={responsiveBool ? 'small' : ''}
            >
              <TableBody>
                <TableRow>
                  <TableCell as="th" width="25%">
                    Name
                  </TableCell>
                  <TableCell as="th" width="25%">
                    Date Submitted
                  </TableCell>
                  <TableCell as="th" width="25%">
                    Status
                  </TableCell>
                  <TableCell as="th" width="25%" />
                </TableRow>
                <TableRow>
                  <TableCell>{application.ownerName}</TableCell>
                  <TableCell>{application.dateSubmitted}</TableCell>
                  <TableCell>{application.submittedStatus}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleApplicationClick(application)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Flex>
        )}
      </Collection>
    </Flex>
  );
}
