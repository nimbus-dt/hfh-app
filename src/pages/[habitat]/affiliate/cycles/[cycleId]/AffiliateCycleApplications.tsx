import {
  DataStore,
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from '@aws-amplify/datastore';
import CustomButton from 'components/CustomButton/CustomButton';
import TableWithPaginator from 'components/TableWithPaginator';
import { useTestApplicationsQuery, useTestCycleById } from 'hooks/services';
import {
  SubmissionStatus,
  LazyTestApplication,
  TestApplication,
  Habitat,
  ApplicationTypes,
} from 'models';
import React, { useState } from 'react';
import {
  MdOutlineAdd,
  MdOutlineArrowBack,
  MdOutlineClose,
  MdOutlineFilterList,
  MdOutlineOpenInNew,
} from 'react-icons/md';
import { useOutletContext, useParams } from 'react-router-dom';
import { stringToHumanReadable } from 'utils/strings';
import IconButton from 'components/IconButton';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import DropdownMenu from 'components/DropdownMenu';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import { Storage } from 'aws-amplify';
import Modal from 'components/Modal';
import {
  Button,
  CheckboxField,
  Flex,
  Text,
  TextField,
} from '@aws-amplify/ui-react';
import NewApplicationModal from 'pages/affiliate-portal/cycles/[cycleId]/components/NewApplicationModal';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StatusModal from 'pages/affiliate-portal/cycles/[cycleId]/components/StatusModal';
import style from './AffiliateCycleApplications.module.css';
import {
  applicationsFilterSchema,
  TApplicationsFilter,
} from './AffiliateCycleApplications.schema';

interface IOutletContext {
  habitat?: Habitat;
  addCustomStatusToHabitat: (status: string) => void;
  removeCustomStatusToHabitat: (status: string) => void;
  updateCustomStatusToHabitat: (status: string) => void;
}

const REVIEW_STATUS = ['All', DEFAULT_REVIEW_STATUS];

const AffiliateCycleApplications = () => {
  const { cycleId } = useParams();
  const {
    habitat,
    addCustomStatusToHabitat,
    removeCustomStatusToHabitat,
    updateCustomStatusToHabitat,
  } = useOutletContext<IOutletContext>();
  const [reviewStatus, setReviewStatus] = useState(REVIEW_STATUS[0]);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newApplicationOpen, setNewApplicationOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<string>();
  const [trigger, setTrigger] = useState(0);
  const [dateSubmitted, setDateSubmitted] =
    useState<TApplicationsFilter['dateSubmitted']>();
  const [type, setType] = useState<TApplicationsFilter['type']>();
  const [submissionStatus, setSubmissionStatus] =
    useState<TApplicationsFilter['submissionStatus']>();

  const [filterModal, setFilterModal] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    values: { dateSubmitted, type, submissionStatus },
    resolver: zodResolver(applicationsFilterSchema),
  });

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c1: RecursiveModelPredicate<LazyTestApplication>) =>
        c1.and((c2) => {
          let criteriaArr = cycleId ? [c2.testcycleID.eq(cycleId)] : [];

          if (submissionStatus) {
            criteriaArr = [
              ...criteriaArr,
              c2.submissionStatus.eq(submissionStatus),
            ];
          } else {
            criteriaArr = [...criteriaArr, c2.submissionStatus.ne(undefined)];
          }

          if (dateSubmitted) {
            criteriaArr = [...criteriaArr, c2.submittedDate.eq(dateSubmitted)];
          }

          if (type) {
            criteriaArr = [...criteriaArr, c2.type.eq(type)];
          }

          return criteriaArr;
        }),
      paginationProducer: {
        sort: (s: SortPredicate<LazyTestApplication>) =>
          s.submittedDate(SortDirection.DESCENDING),
      },
      dependencyArray: [
        submissionStatus,
        cycleId,
        trigger,
        type,
        dateSubmitted,
      ],
    });

  const { data: cycle } = useTestCycleById({
    id: cycleId,
    dependencyArray: [cycleId],
  });

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    newStatusValue: string
  ) => {
    try {
      const original = await DataStore.query(TestApplication, applicationId);
      if (!original) return;
      await DataStore.save(
        TestApplication.copyOf(original, (originalApplication) => {
          originalApplication.reviewStatus = newStatusValue;
        })
      );
      setTrigger((previousTrigger) => previousTrigger + 1);
    } catch (error) {
      console.log('Error while updating the status');
    }
  };

  const handleStatusOnClick = () => setStatusModalOpen(true);
  const handleOnCloseStatusModal = () => setStatusModalOpen(false);

  const handleAddNewApplicationOnClick = () => setNewApplicationOpen(true);
  const handleOnCloseNewApplicationModal = () => setNewApplicationOpen(false);

  const removeFiles = async (keys: string[]) => {
    try {
      const promisesArr = keys.map((key) =>
        Storage.remove(key, {
          level: 'public',
        })
      );
      await Promise.all(promisesArr);
    } catch (error) {
      console.log('Error deleting files.');
    }
  };

  const handleDeleteOnClick = (applicationId: string) =>
    setApplicationToDelete(applicationId);

  const handleDeleteOnClose = () => setApplicationToDelete(undefined);

  const handleDeleteOnAccept = async () => {
    try {
      if (applicationToDelete === undefined) return;
      const application = await DataStore.query(
        TestApplication,
        applicationToDelete
      );
      const applicationProps = application?.props as unknown as {
        paperApplicationKeys: string[];
      };
      removeFiles(applicationProps.paperApplicationKeys);
      await DataStore.delete(TestApplication, applicationToDelete);
      setTrigger((prevTrigger) => prevTrigger + 1);
    } catch (error) {
      console.log('Error deleting application.');
    }
    setApplicationToDelete(undefined);
  };

  const handleOpenCloseFilters = () => {
    reset();
    setFilterModal((prevFilterModal) => !prevFilterModal);
  };

  const handleFilterOnValid = (data: TApplicationsFilter) => {
    setDateSubmitted(data.dateSubmitted);
    setType(data.type);
    setSubmissionStatus(data.submissionStatus);
    setFilterModal(false);
  };

  const handleResetFilters = () => {
    setDateSubmitted(undefined);
    setType(undefined);
    setSubmissionStatus(undefined);
  };

  return (
    <div className={style.container}>
      <BreadCrumbs
        items={[
          { label: 'Homeownership Form' },
          { label: 'Cycles' },
          { label: 'Applications' },
        ]}
      />
      <div className={`${style.titleContainer}`}>
        <IconButton variation="not-outlined">
          <MdOutlineArrowBack />
        </IconButton>
        <span className={`theme-headline-medium ${style.title}`}>
          Applications Dashboard
        </span>
      </div>
      <div className={`${style.tableOptions}`}>
        <div className={`${style.resultsContainer}`}>
          <span className="theme-subtitle-s2">Applications</span>
          <span
            className={`${style.results}`}
          >{`${applications.length} results`}</span>
        </div>
        <div className={`${style.options}`}>
          <IconButton type="button" onClick={handleOpenCloseFilters}>
            <MdOutlineFilterList />
          </IconButton>
          {filterModal && (
            <form
              onSubmit={handleSubmit(handleFilterOnValid)}
              className={style.filterModal}
            >
              <div className={`${style.filterModalTitleContainer}`}>
                <span className="theme-subtitle-s2">Filter Options</span>
                <IconButton
                  variation="not-outlined"
                  onClick={handleOpenCloseFilters}
                >
                  <MdOutlineClose />
                </IconButton>
              </div>
              <div className={`${style.inputContainer}`}>
                <div className={`theme-body-small ${style.inputTitle}`}>
                  <span>Dates</span>
                </div>
                <div>
                  <span className={`${style.dateLabel}`}>Date Submitted</span>
                  <TextField
                    {...register('dateSubmitted')}
                    label=""
                    labelHidden
                    type="date"
                    className={`${style.customDateInput}`}
                  />
                </div>
              </div>
              <div className={`${style.inputContainer}`}>
                <div className={`theme-body-small ${style.inputTitle}`}>
                  <span>Type</span>
                </div>
                <Controller
                  control={control}
                  name="type"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <CheckboxField
                        name=""
                        label="Online"
                        className={`${style.customCheckbox}`}
                        checked={value === ApplicationTypes.ONLINE}
                        onChange={(event) =>
                          onChange(
                            event.target.checked
                              ? ApplicationTypes.ONLINE
                              : null
                          )
                        }
                      />
                      <CheckboxField
                        name=""
                        label="Offline"
                        className={`${style.customCheckbox}`}
                        checked={value === ApplicationTypes.PAPER}
                        onChange={(event) =>
                          onChange(
                            event.target.checked ? ApplicationTypes.PAPER : null
                          )
                        }
                      />
                    </>
                  )}
                />
              </div>
              <div className={`${style.inputContainer}`}>
                <div className={`theme-body-small ${style.inputTitle}`}>
                  <span>Status</span>
                </div>
                <Controller
                  control={control}
                  name="submissionStatus"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <CheckboxField
                        name=""
                        label="Pending"
                        checked={value === SubmissionStatus.PENDING}
                        onChange={(event) =>
                          onChange(
                            event.target.checked
                              ? SubmissionStatus.PENDING
                              : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Accepted"
                        checked={value === SubmissionStatus.ACCEPTED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked
                              ? SubmissionStatus.ACCEPTED
                              : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Rejected"
                        checked={value === SubmissionStatus.REJECTED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked
                              ? SubmissionStatus.REJECTED
                              : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Returned"
                        checked={value === SubmissionStatus.RETURNED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked
                              ? SubmissionStatus.RETURNED
                              : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                    </>
                  )}
                />
              </div>
              <div className={`${style.filterModalButtonsContainer}`}>
                <CustomButton
                  variation="text-only"
                  onClick={handleResetFilters}
                >
                  Clear Filters
                </CustomButton>
                <CustomButton type="submit">Save</CustomButton>
              </div>
            </form>
          )}
          <NewApplicationModal
            open={newApplicationOpen}
            onClose={handleOnCloseNewApplicationModal}
            habitat={habitat}
            cycle={cycle}
            setTrigger={setTrigger}
          />
          <CustomButton
            onClick={handleAddNewApplicationOnClick}
            icon={<MdOutlineAdd />}
          >
            New Application
          </CustomButton>
        </div>
      </div>
      <Modal
        title="Alert"
        open={applicationToDelete !== undefined}
        onClickClose={handleDeleteOnClose}
        width="30rem"
      >
        <Flex direction="column">
          <Text>
            Are you sure you want to delete the application? This can't be
            undone.
          </Text>
          <Flex justifyContent="end">
            <Button onClick={handleDeleteOnClose}>Cancel</Button>
            <Button variation="primary" onClick={handleDeleteOnAccept}>
              Accept
            </Button>
          </Flex>
        </Flex>
      </Modal>
      <StatusModal
        open={statusModalOpen}
        onClose={handleOnCloseStatusModal}
        habitat={habitat}
        addCustomStatusToHabitat={addCustomStatusToHabitat}
        removeCustomStatusToHabitat={removeCustomStatusToHabitat}
        updateCustomStatusToHabitat={updateCustomStatusToHabitat}
        setTrigger={setTrigger}
      />
      <TableWithPaginator
        headers={[
          {
            id: 'name',
            value: 'Name',
            width: '100%',
          },
          {
            id: 'type',
            value: 'Type',
          },
          {
            id: 'dateSubmitted',
            value: 'Date Submitted',
          },
          {
            id: 'submissionStatus',
            value: 'Submission Status',
          },
          {
            id: 'reviewStatus',
            value: (
              <span
                className={`${style.reviewStatus}`}
                onClick={handleStatusOnClick}
                aria-hidden="true"
              >
                Review Status
              </span>
            ),
          },
          {
            id: 'view',
            value: 'View',
          },
        ]}
        data={applications.map((application, index) => {
          const applicationProps = application.props as unknown as {
            name: string;
          };
          return {
            id: index,
            cells: [
              {
                id: 'name',
                value:
                  application.type === ApplicationTypes.ONLINE
                    ? 'John Doe'
                    : applicationProps?.name || '',
              },
              {
                id: 'type',
                value: stringToHumanReadable(application.type),
              },
              {
                id: 'dateSubmitted',
                value: application.submittedDate,
              },
              {
                id: 'submissionStatus',
                value:
                  application.submissionStatus &&
                  stringToHumanReadable(application.submissionStatus),
              },
              {
                id: 'reviewStatus',
                value: (
                  <DropdownMenu
                    className={`${style.customStatusSelect}`}
                    variation="small"
                    value={application.reviewStatus || ''}
                    onChange={(event) =>
                      handleUpdateApplicationStatus(
                        application.id,
                        event.currentTarget.value
                      )
                    }
                  >
                    {[
                      DEFAULT_REVIEW_STATUS,
                      ...(habitat ? habitat.props.customStatus || [] : []),
                    ].map((selectedStatus) => (
                      <option key={selectedStatus} value={selectedStatus}>
                        {selectedStatus}
                      </option>
                    ))}
                  </DropdownMenu>
                ),
              },
              {
                id: 'view',
                value: (
                  <div className={style.openButtonContainer}>
                    <CustomButton
                      className={style.openButton}
                      variation="text-only"
                    >
                      <MdOutlineOpenInNew
                        size="24px"
                        color="var(--amplify-colors-neutral-90)"
                      />
                    </CustomButton>
                  </div>
                ),
              },
            ],
          };
        })}
      />
    </div>
  );
};

export default AffiliateCycleApplications;
