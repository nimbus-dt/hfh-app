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
import { useState } from 'react';
import {
  useApplicantInfosQuery,
  useTestApplicationsQuery,
} from 'hooks/services';
import { DataStore } from 'aws-amplify';
import { TestApplication } from 'models';
import StatusSelect from './components/StatusSelect';

// const STATUS = ['All', 'Unset', 'Pending', 'Accepted'];
const UNSET = 'Unset';
const STATUS = ['All', UNSET];

const perPage = 5;

const TestApplications = () => {
  const { habitat, addCustomStatusToHabitat } = useOutletContext();
  const [status, setStatus] = useState(STATUS[0]);
  const [trigger, setTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: applications } = useTestApplicationsQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        let criteriaArr = [
          c2.testApplicationAffiliateId.eq(habitat?.id),
          c2.submitted.eq(true),
        ];

        if (status !== STATUS[0]) {
          criteriaArr = [...criteriaArr, c2.status.eq(status)];
        }

        return criteriaArr;
      }),
    dependencyArray: [habitat?.id, status, trigger],
  });

  const { data: applicantInfos } = useApplicantInfosQuery({
    criteria: (c) =>
      c.or((c2) => {
        const arrayOfFilters = applications.map((application) =>
          c2.ownerID.eq(application.id)
        );

        return arrayOfFilters;
      }),
    dependencyArray: [applications],
  });

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleUpdateApplicationStatus = async (applicationId, newStatus) => {
    if (habitat) {
      try {
        if (
          !(
            habitat.props.data.customStatus
              ? habitat.props.data.customStatus
              : []
          ).includes(newStatus)
        ) {
          await addCustomStatusToHabitat(newStatus);
        }
        const original = await DataStore.query(TestApplication, applicationId);
        await DataStore.save(
          TestApplication.copyOf(original, (originalApplication) => {
            originalApplication.status = newStatus;
          })
        );
        setTrigger((previousTrigger) => previousTrigger + 1);
      } catch (error) {
        console.log('Error while updating the status');
      }
    }
  };

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
          {[
            ...STATUS,
            ...(habitat ? habitat.props.data.customStatus || [] : []),
          ].map((statusValue) => (
            <option key={statusValue} value={statusValue}>
              {statusValue}
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
                <TableRow key={application.id}>
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
                  <TableCell>
                    <StatusSelect
                      defaultValue={application.status}
                      options={[
                        UNSET,
                        ...(habitat
                          ? habitat.props.data.customStatus || []
                          : []),
                      ]}
                      onChange={(newStatus) =>
                        handleUpdateApplicationStatus(application.id, newStatus)
                      }
                    />
                  </TableCell>
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
