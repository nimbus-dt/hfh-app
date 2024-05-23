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
  ReviewStatus,
  LazyFormAnswer,
} from 'models';
import React, { useEffect, useState } from 'react';
import {
  MdOutlineAdd,
  MdOutlineArrowBack,
  MdOutlineClose,
  MdOutlineFilterList,
  MdOutlineLink,
  MdOutlineOpenInNew,
} from 'react-icons/md';
import {
  Link,
  resolvePath,
  useLocation,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { stringToHumanReadable } from 'utils/strings';
import IconButton from 'components/IconButton';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import DropdownMenu from 'components/DropdownMenu';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import {
  CheckboxField,
  TextField,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { dateOnly } from 'utils/dates';
import StatusChip from 'components/StatusChip';
import style from './AffiliateCycleApplications.module.css';
import {
  applicationsFilterSchema,
  TApplicationsFilter,
} from './AffiliateCycleApplications.schema';
import NewApplicationModal from './components/NewApplicationModal';
import StatusModal from './components/StatusModal';

interface IOutletContext {
  habitat?: Habitat;
  addCustomStatusToHabitat: (status: string) => void;
  removeCustomStatusToHabitat: (status: string) => void;
  updateCustomStatusToHabitat: (status: string) => void;
}

const AffiliateCycleApplications = () => {
  const { pathname } = useLocation();
  const isSmall = useBreakpointValue({
    base: true,
    medium: false,
  });
  const { cycleId } = useParams();
  const {
    habitat,
    addCustomStatusToHabitat,
    removeCustomStatusToHabitat,
    updateCustomStatusToHabitat,
  } = useOutletContext<IOutletContext>();
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newApplicationOpen, setNewApplicationOpen] = useState(false);
  const [trigger, setTrigger] = useState(0);
  const [dateSubmitted, setDateSubmitted] =
    useState<TApplicationsFilter['dateSubmitted']>();
  const [type, setType] = useState<TApplicationsFilter['type']>();
  const [reviewStatus, setReviewStatus] =
    useState<TApplicationsFilter['reviewStatus']>();

  const [filterModal, setFilterModal] = useState(false);
  const { register, control, handleSubmit, reset } = useForm({
    values: { dateSubmitted, type, reviewStatus },
    resolver: zodResolver(applicationsFilterSchema),
  });

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c1: RecursiveModelPredicate<LazyTestApplication>) =>
        c1.and((c2) => {
          let criteriaArr = cycleId
            ? [
                c2.testcycleID.eq(cycleId),
                c2.submissionStatus.eq(SubmissionStatus.COMPLETED),
              ]
            : [];

          if (reviewStatus) {
            criteriaArr = [...criteriaArr, c2.reviewStatus.eq(reviewStatus)];
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
      dependencyArray: [reviewStatus, cycleId, trigger, type, dateSubmitted],
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
          originalApplication.customStatus = newStatusValue;
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

  const handleOpenCloseFilters = () => {
    reset();
    setFilterModal((prevFilterModal) => !prevFilterModal);
  };

  const handleFilterOnValid = (data: TApplicationsFilter) => {
    setDateSubmitted(data.dateSubmitted);
    setType(data.type);
    setReviewStatus(data.reviewStatus);
    setFilterModal(false);
  };

  const handleResetFilters = () => {
    setDateSubmitted(undefined);
    setType(undefined);
    setReviewStatus(undefined);
  };

  const handleCopyToClipboard = () => {
    const pathToForm = resolvePath(`../../../applicant/${cycleId}`, pathname);
    const { origin } = window.location;
    const applicantLink = `${origin}${pathToForm.pathname}`;
    navigator.clipboard.writeText(applicantLink);
  };

  return (
    <div className={style.container}>
      {!isSmall && (
        <BreadCrumbs
          items={[
            { label: 'Homeownership Form', to: '../../forms' },
            { label: 'Cycles', to: '../' },
            { label: 'Applications' },
          ]}
        />
      )}
      <div className={`${style.titleContainer}`}>
        <Link to="../">
          <IconButton variation="not-outlined">
            <MdOutlineArrowBack />
          </IconButton>
        </Link>
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
          <div className={`${style.suboptions}`}>
            <IconButton
              type="button"
              onClick={handleCopyToClipboard}
              title="Copy link for applicants to clipboard"
            >
              <MdOutlineLink />
            </IconButton>
            <IconButton type="button" onClick={handleOpenCloseFilters}>
              <MdOutlineFilterList />
            </IconButton>
          </div>
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
                  name="reviewStatus"
                  render={({ field: { value, onChange } }) => (
                    <>
                      <CheckboxField
                        name=""
                        label="Pending"
                        checked={value === ReviewStatus.PENDING}
                        onChange={(event) =>
                          onChange(
                            event.target.checked ? ReviewStatus.PENDING : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Accepted"
                        checked={value === ReviewStatus.ACCEPTED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked ? ReviewStatus.ACCEPTED : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Denied"
                        checked={value === ReviewStatus.DENIED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked ? ReviewStatus.DENIED : null
                          )
                        }
                        className={`${style.customCheckbox}`}
                      />
                      <CheckboxField
                        name=""
                        label="Returned"
                        checked={value === ReviewStatus.RETURNED}
                        onChange={(event) =>
                          onChange(
                            event.target.checked ? ReviewStatus.RETURNED : null
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
            icon={isSmall ? undefined : <MdOutlineAdd />}
          >
            {isSmall ? <MdOutlineAdd size="24px" /> : 'New Application'}
          </CustomButton>
        </div>
      </div>
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
            id: 'reviewStatus',
            value: 'Review Status',
          },
          {
            id: 'customStatus',
            value: (
              <span
                className={`${style.reviewStatus}`}
                onClick={handleStatusOnClick}
                aria-hidden="true"
              >
                Custom Status
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
          console.log(applicationProps);
          console.log(application);

          return {
            id: index,
            cells: [
              {
                id: 'name',
                value:
                  application.type === ApplicationTypes.ONLINE ? (
                    <Name application={application} />
                  ) : (
                    applicationProps?.name || ''
                  ),
              },
              {
                id: 'type',
                value: stringToHumanReadable(application.type),
              },
              {
                id: 'dateSubmitted',
                value: dateOnly(application.submittedDate),
              },
              {
                id: 'reviewStatus',
                value: application.reviewStatus && (
                  <div className={`${style.statusContainer}`}>
                    <StatusChip status={application.reviewStatus} />
                  </div>
                ),
              },
              {
                id: 'customStatus',
                value: (
                  <DropdownMenu
                    className={`${style.customStatusSelect}`}
                    variation="small"
                    value={application.customStatus || ''}
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
                    <Link to={application.id}>
                      <CustomButton
                        className={style.openButton}
                        variation="text-only"
                      >
                        <MdOutlineOpenInNew
                          size="24px"
                          color="var(--amplify-colors-neutral-90)"
                        />
                      </CustomButton>
                    </Link>
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

const Name = ({ application }: { application: TestApplication }) => {
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await application.FormAnswers.toArray();
      let response = 'unknown';
      for (let i = 0; i < result.length; i++) {
        // eslint-disable-next-line no-prototype-builtins
        if (result[i]?.values?.hasOwnProperty('applicantBasicInformation')) {
          response =
            result[i]?.values?.applicantBasicInformation
              ?.applicantBasicInformationFullName;
        }
      }
      setName(response);
    };

    fetchData();
  }, [application]);

  return name;
};

export default AffiliateCycleApplications;
