import { Link, useOutletContext } from 'react-router-dom';
import {
  Flex,
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
  Text,
  ScrollView,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { useTestCyclesQuery } from 'hooks/services';
import { DataStore, SortDirection } from 'aws-amplify';
import { MdAdd, MdMoreHoriz } from 'react-icons/md';
import { TiLockClosed } from 'react-icons/ti';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import { TestCycle } from 'models';
import { getHabitatOpenCycle } from 'utils/misc';
import PageTitle from '../components/PageTitle/PageTitle';

const perPage = 5;

const CycleApplicationsNumber = ({ cycle }) => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const getCycleApplications = async () => {
      const cycleApplications = await cycle.TestApplications.toArray();
      setApplications(cycleApplications);
    };

    getCycleApplications();
  }, [cycle]);

  return applications.length;
};

const CyclesPage = () => {
  const { habitat } = useOutletContext();
  const [isOpenFilter, setIsOpen] = useState();
  const [cycleToClose, setCycleToClose] = useState();
  const [showNewApplicationAlert, setShowNewApplicationAlert] = useState(false);
  const [showNewApplicationError, setShowNewApplicationError] = useState(false);

  const [trigger, setTrigger] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: cycles } = useTestCyclesQuery({
    criteria: (c1) =>
      c1.and((c2) => {
        let criteriaArr = [c2.habitatID.eq(habitat?.id)];

        if (isOpenFilter >= 0) {
          criteriaArr = [
            ...criteriaArr,
            c2.isOpen.eq(Number(isOpenFilter) === 1),
          ];
        }

        return criteriaArr;
      }),
    paginationProducer: {
      sort: (s) => s.startDate(SortDirection.DESCENDING),
    },
    dependencyArray: [habitat?.id, isOpenFilter, trigger],
  });

  const responsiveBool = useBreakpointValue({
    base: true,
    large: false,
  });

  const handleOnClickNewCycle = async () => {
    if (!(await getHabitatOpenCycle(habitat.id))) {
      setShowNewApplicationAlert(true);
    } else {
      setShowNewApplicationError(true);
    }
  };
  const handleOnCloseNewCycleAlert = () => setShowNewApplicationAlert(false);

  const handleOnCloseNewCycleError = () => setShowNewApplicationError(false);

  const handleOnAcceptNewCycle = async () => {
    try {
      await DataStore.save(
        new TestCycle({
          startDate: dayjs().format('YYYY-MM-DD'),
          isOpen: true,
          habitatID: habitat.id,
        })
      );
      setTrigger((previousTrigger) => previousTrigger + 1);
    } catch (error) {
      console.log('Error creating a new cycle.');
    }
    setShowNewApplicationAlert(false);
  };

  const handleCloseCycleOnClick = (cycleId) => setCycleToClose(cycleId);

  const handleCloseCycleOnAccept = async () => {
    try {
      const original = await DataStore.query(TestCycle, cycleToClose);
      await DataStore.save(
        TestCycle.copyOf(original, (persistedCycle) => {
          persistedCycle.isOpen = false;
          persistedCycle.endDate = dayjs().format('YYYY-MM-DD');
        })
      );
      setTrigger((previousTrigger) => previousTrigger + 1);
    } catch (error) {
      console.log('Error closing the cycle');
    }
    setCycleToClose(undefined);
  };

  const handleCloseCycleOnClose = () => setCycleToClose(undefined);

  return (
    <Flex
      direction="column"
      width="100%"
      alignContent="center"
      justifyContent="center"
    >
      <PageTitle title="Cycles" />
      <Modal
        title="Alert"
        open={showNewApplicationAlert}
        onClickClose={handleOnCloseNewCycleAlert}
        width="30rem"
      >
        <Text>
          You are about to create a new cycle with start date{' '}
          {dayjs().format('YYYY-MM-DD')}. You want to continue?
        </Text>
        <br />
        <Flex justifyContent="end">
          <Button onClick={handleOnCloseNewCycleAlert}>Cancel</Button>
          <Button variation="primary" onClick={handleOnAcceptNewCycle}>
            Accept
          </Button>
        </Flex>
      </Modal>
      <Modal
        title="Alert"
        open={showNewApplicationError}
        onClickClose={handleOnCloseNewCycleError}
        width="30rem"
      >
        <Text>
          You already have an open application cycle. You can only create a new
          one once the open application cycle is closed.
        </Text>
        <br />
        <Flex justifyContent="end">
          <Button variation="primary" onClick={handleOnCloseNewCycleError}>
            Accept
          </Button>
        </Flex>
      </Modal>
      <Flex
        direction="row"
        width="100%"
        marginLeft="0"
        justifyContent={responsiveBool ? 'center' : 'space-between'}
        alignItems="end"
      >
        <Flex>
          <SelectField
            label="Open status"
            value={isOpenFilter}
            onChange={(event) => {
              setIsOpen(event.target.value);
            }}
          >
            <option value={-1}>All</option>
            <option value={1}>Open</option>
            <option value={0}>Close</option>
          </SelectField>
        </Flex>
        <Flex alignItems="end">
          <Badge>
            <Flex alignItems="center">Total: {cycles.length}</Flex>
          </Badge>
          <Button
            height="2rem"
            width="2rem"
            padding="0"
            onClick={handleOnClickNewCycle}
          >
            <MdAdd size="1.25rem" />
          </Button>
        </Flex>
      </Flex>
      <Flex width="auto" direction="column" justifyContent="center">
        <Modal
          title="Alert"
          open={cycleToClose !== undefined}
          onClickClose={handleCloseCycleOnClose}
          width="30rem"
        >
          <Flex direction="column">
            <Text>
              Are you sure you want to close the cycle? This can't be undone.
            </Text>
            <Flex justifyContent="end">
              <Button onClick={handleCloseCycleOnClose}>Cancel</Button>
              <Button variation="primary" onClick={handleCloseCycleOnAccept}>
                Accept
              </Button>
            </Flex>
          </Flex>
        </Modal>
        <ScrollView maxWidth="100%">
          <Table
            caption=""
            highlightOnHover
            variation="striped"
            justify-content="center"
            size={responsiveBool ? 'small' : ''}
          >
            <TableHead>
              <TableRow>
                <TableCell as="th" width="fit-content">
                  Index
                </TableCell>
                <TableCell as="th" minWidth="11ch">
                  Start date
                </TableCell>
                <TableCell as="th" minWidth="11ch">
                  End date
                </TableCell>
                <TableCell as="th" minWidth="20ch">
                  Open status
                </TableCell>
                <TableCell as="th" minWidth="20ch">
                  Total applications
                </TableCell>
                <TableCell as="th" width="fit-content">
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cycles
                .slice((currentPage - 1) * perPage, currentPage * perPage)
                .map((cycle, index) => (
                  <TableRow key={cycle.id}>
                    <TableCell>
                      {index + 1 + (currentPage - 1) * perPage}
                    </TableCell>
                    <TableCell>{cycle.startDate}</TableCell>
                    <TableCell>{cycle.endDate}</TableCell>
                    <TableCell>{cycle.isOpen ? 'Open' : 'Close'}</TableCell>
                    <TableCell>
                      <CycleApplicationsNumber cycle={cycle} />
                    </TableCell>
                    <TableCell>
                      <Flex justifyContent="center">
                        <Link to={`../cycles/${cycle?.id}`}>
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="View"
                          >
                            <MdMoreHoriz size="1.25rem" />
                          </Button>
                        </Link>
                        {cycle.isOpen && (
                          <Button
                            height="2rem"
                            width="2rem"
                            padding="0"
                            title="Delete"
                            variation="destructive"
                            onClick={() => handleCloseCycleOnClick(cycle.id)}
                          >
                            <TiLockClosed size="1.25rem" />
                          </Button>
                        )}
                      </Flex>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </ScrollView>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(cycles.length / perPage)}
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

export default CyclesPage;
