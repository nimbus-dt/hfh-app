import { Link, useOutletContext } from 'react-router-dom';
import {
  Flex,
  Heading,
  Divider,
  SelectField,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  useBreakpointValue,
  TableHead,
  Pagination,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { APPLICATION_SUBMITTED_STATUS_LIST } from 'utils/constants';
import {
  useApplicantInfosQuery,
  useTestApplicationsQuery,
} from 'hooks/services';

const ALL_STATUS_KEY = 'ALL';
const STATUS_LIST = [
  {
    key: ALL_STATUS_KEY,
    value: 'All',
  },
  ...APPLICATION_SUBMITTED_STATUS_LIST,
];

const perPage = 5;

const TestApplications = () => {
  const { habitat } = useOutletContext();
  const [status, setStatus] = useState(ALL_STATUS_KEY);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: applications } = useTestApplicationsQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        const criteriaArr = [
          c2.testApplicationAffiliateId.eq(habitat.id),
          c2.submitted.eq(true),
        ];

        return criteriaArr;
      }),
    dependencyArray: [],
  });

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c) =>
      c.or((c2) => {
        const arrayOfFilters = applications.map((application) =>
          c2.ownerID.eq(application.id)
        );

        console.log(arrayOfFilters);
        return arrayOfFilters;
      }),
    dependencyArray: [applications],
  });

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  useEffect(() => {
    console.log('applicants', applicantInfos);
  }, [applicantInfos]);

  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <Heading level={3} fontWeight="bold" textAlign="center">
        Submitted applications
      </Heading>
      <Divider />
      <Flex
        direction="row"
        width="100%"
        marginLeft="0"
        justifyContent={responsiveBool ? 'center' : 'left'}
      >
        <SelectField
          value={status}
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
          <Flex alignItems="center">Total: {applications.length}</Flex>
        </Badge>
      </Flex>
      <Flex width="auto" direction="column" justifyContent="center">
        <Table
          caption=""
          highlightOnHover
          variation="striped"
          justify-content="center"
          size={responsiveBool ? 'small' : ''}
        >
          <TableHead>
            <TableRow>
              <TableCell as="th" width="25%">
                Index
              </TableCell>
              <TableCell as="th" width="25%">
                Name
              </TableCell>
              <TableCell as="th" width="25%">
                Date Submitted
              </TableCell>
              <TableCell as="th" width="25%">
                Status
              </TableCell>
              <TableCell as="th" width="25%">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications
              .slice((currentPage - 1) * perPage, currentPage * perPage)
              .map((application, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {index + 1 + (currentPage - 1) * perPage}
                  </TableCell>
                  <TableCell>
                    {
                      applicantInfos.find(
                        (applicantInfo) =>
                          applicantInfo.ownerID === application.id
                      )?.props.basicInfo.fullName
                    }
                  </TableCell>
                  <TableCell>{application.submittedDate}</TableCell>
                  <TableCell>{application.status}</TableCell>
                  <TableCell>
                    <Link to={`../applications/${application?.id}`}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(applications.length / perPage)}
          onChange={(newCurrentPage) => setCurrentPage(newCurrentPage)}
          onNext={() =>
            setCurrentPage((previousCurrentPage) => previousCurrentPage + 1)
          }
          onPrevious={() =>
            setCurrentPage((previousCurrentPage) => previousCurrentPage - 1)
          }
        />
      </Flex>
    </Flex>
  );
};

export default TestApplications;
