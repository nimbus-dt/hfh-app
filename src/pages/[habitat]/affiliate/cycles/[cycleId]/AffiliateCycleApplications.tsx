import { useTranslation } from 'react-i18next';
import {
  DataStore,
  RecursiveModelPredicate,
  SortDirection,
  SortPredicate,
} from 'aws-amplify/datastore';
import CustomButton from 'components/CustomButton/CustomButton';
import TableWithPaginator from 'components/TableWithPaginator';
import { useTestApplicationsQuery, useTestCycleById } from 'hooks/services';
import {
  SubmissionStatus,
  LazyTestApplication,
  TestApplication,
  ApplicationTypes,
} from 'models';
import { useState } from 'react';
import {
  MdOutlineAdd,
  MdOutlineFilterList,
  MdOutlineLink,
  MdOutlineOpenInNew,
} from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';
import { stringToHumanReadable } from 'utils/strings';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import DropdownMenu from 'components/DropdownMenu';
import GoBack from 'components/GoBack';
import { DEFAULT_REVIEW_STATUS } from 'utils/constants';
import { useBreakpointValue } from '@aws-amplify/ui-react';
import { convertDateYYYYMMDDtoDDMMYYYY } from 'utils/dates';
import StatusChip from 'components/StatusChip';
import useHabitat from 'hooks/utils/useHabitat';
import style from './AffiliateCycleApplications.module.css';
import NewApplicationModal from './components/NewApplicationModal';
import StatusModal from './components/StatusModal';
import { Inputs } from './types';
import Filters from './components/Filters';
import Username from './components/Username';
import { redirectToApplicant } from './utils';

const AffiliateCycleApplications = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isSmall = useBreakpointValue({
    base: true,
    medium: false,
  });
  const { cycleId } = useParams();

  const { habitat } = useHabitat();

  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [newApplicationOpen, setNewApplicationOpen] = useState(false);

  const [trigger, setTrigger] = useState(0);

  const [filterModal, setFilterModal] = useState(false);

  const [filters, setFilters] = useState<Inputs>({
    startDateSubmitted: '',
    endDateSubmitted: '',
    type: null,
    reviewStatus: null,
    customStatus: '',
  });

  const { data: applications }: { data: TestApplication[] } =
    useTestApplicationsQuery({
      criteria: (c1: RecursiveModelPredicate<LazyTestApplication>) =>
        c1.and((c2) => {
          let criteriaArr = cycleId ? [c2.testcycleID.eq(cycleId)] : [];

          if (filters.reviewStatus) {
            criteriaArr = [
              ...criteriaArr,
              c2.reviewStatus.eq(filters.reviewStatus),
            ];
          }

          if (
            filters.startDateSubmitted &&
            filters.startDateSubmitted !== 'MM/DD/YYYY'
          ) {
            criteriaArr = [
              ...criteriaArr,
              c2.submittedDate.ge(filters.startDateSubmitted),
            ];
          }

          if (
            filters.endDateSubmitted &&
            filters.endDateSubmitted !== 'MM/DD/YYYY'
          ) {
            criteriaArr = [
              ...criteriaArr,
              c2.submittedDate.le(filters.endDateSubmitted),
            ];
          }

          if (filters.type) {
            criteriaArr = [...criteriaArr, c2.type.eq(filters.type)];
          }

          if (filters.customStatus === DEFAULT_REVIEW_STATUS) {
            criteriaArr = [
              ...criteriaArr,
              c2.or((c3) => [
                c3.customStatus.eq(filters.customStatus),
                c3.customStatus.eq(null),
              ]),
            ];
          } else if (filters.customStatus) {
            criteriaArr = [
              ...criteriaArr,
              c2.customStatus.eq(filters.customStatus),
            ];
          }

          return criteriaArr;
        }),
      paginationProducer: {
        sort: (s: SortPredicate<LazyTestApplication>) =>
          s.submittedDate(SortDirection.DESCENDING),
      },
      dependencyArray: [cycleId, trigger, filters],
    });

  let applicationsCompleted: TestApplication[] = [];
  let applicationsPending: TestApplication[] = [];

  if (applications) {
    applicationsCompleted = applications.filter(
      (application) =>
        application.submissionStatus === SubmissionStatus.COMPLETED
    );

    applicationsPending = applications.filter(
      (application) =>
        application.submissionStatus === SubmissionStatus.INCOMPLETE
    );
  }

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

  const breadCrumbsItems = [
    { label: t('pages.habitat.affiliate.forms.name'), to: '../../forms' },
    { label: t('pages.habitat.affiliate.cycles.name'), to: '..' },
    { label: t('pages.habitat.affiliate.cycles.cycle.name') },
  ];

  return (
    <div className={style.container}>
      <div className={style.firstRow}>
        {!isSmall && <BreadCrumbs items={breadCrumbsItems} />}
        <p className={`theme-body-medium ${style.incompleteApplications}`}>
          {t('pages.habitat.affiliate.cycles.cycle.incompleteApplications')}{' '}
          {applicationsPending.length}
        </p>
      </div>
      <div className={`${style.titleContainer}`}>
        <GoBack />
        <span className={`theme-headline-medium ${style.title}`}>
          {t('pages.habitat.affiliate.cycles.cycle.title')}
        </span>
      </div>
      <div className={`${style.tableOptions}`}>
        <div className={`${style.resultsContainer}`}>
          <span className="theme-subtitle-s2">
            {t('pages.habitat.affiliate.cycles.cycle.table.title')}
          </span>
          <span className={`${style.results}`}>{`${
            applicationsCompleted.length
          } ${t('pages.habitat.affiliate.cycles.cycle.table.results')}`}</span>
        </div>
        <div className={`${style.options}`}>
          <div className={`${style.suboptions}`}>
            <CustomButton
              onClick={() => redirectToApplicant({ cycleId, pathname })}
              icon={isSmall ? undefined : <MdOutlineLink />}
              title={t('pages.habitat.affiliate.cycles.cycle.applicantLink')}
            >
              {isSmall ? (
                <MdOutlineLink size="24px" />
              ) : (
                t('pages.habitat.affiliate.cycles.cycle.applicantLink')
              )}
            </CustomButton>
            <CustomButton
              onClick={() => setFilterModal(true)}
              icon={isSmall ? undefined : <MdOutlineFilterList />}
            >
              {isSmall ? <MdOutlineFilterList size="24px" /> : 'Filter'}
            </CustomButton>
          </div>
          {filterModal && (
            <Filters
              filters={filters}
              setFilters={(data) => setFilters(data)}
              close={() => setFilterModal(false)}
              customStatuses={habitat?.props?.customStatus || []}
            />
          )}
          <NewApplicationModal
            open={newApplicationOpen}
            onClose={handleOnCloseNewApplicationModal}
            cycle={cycle}
            setTrigger={setTrigger}
          />

          <CustomButton
            onClick={handleAddNewApplicationOnClick}
            icon={isSmall ? undefined : <MdOutlineAdd />}
          >
            {isSmall ? (
              <MdOutlineAdd size="24px" />
            ) : (
              t('pages.habitat.affiliate.cycles.cycle.newApplication')
            )}
          </CustomButton>
        </div>
      </div>
      <StatusModal
        open={statusModalOpen}
        onClose={handleOnCloseStatusModal}
        setTrigger={setTrigger}
      />
      <TableWithPaginator
        headers={[
          {
            id: 'name',
            value: t('pages.habitat.affiliate.cycles.cycle.table.name'),
            width: '100%',
          },
          {
            id: 'type',
            value: t('pages.habitat.affiliate.cycles.cycle.table.type'),
          },
          {
            id: 'dateSubmitted',
            value: t(
              'pages.habitat.affiliate.cycles.cycle.table.dateSubmitted'
            ),
          },
          {
            id: 'reviewStatus',
            value: t('pages.habitat.affiliate.cycles.cycle.table.reviewStatus'),
          },
          {
            id: 'customStatus',
            value: (
              <span
                className={`${style.reviewStatus}`}
                onClick={handleStatusOnClick}
                aria-hidden="true"
              >
                {t('pages.habitat.affiliate.cycles.cycle.table.customStatus')}
              </span>
            ),
          },
          {
            id: 'view',
            value: t('pages.habitat.affiliate.cycles.cycle.table.view'),
          },
        ]}
        data={applicationsCompleted.map((application, index) => {
          const applicationProps = application.props as unknown as {
            name: string;
          };
          return {
            id: index,
            cells: [
              {
                id: 'name',
                value:
                  application.type === ApplicationTypes.ONLINE ? (
                    <Username application={application} />
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
                value: convertDateYYYYMMDDtoDDMMYYYY(application.submittedDate),
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
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
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
                  </div>
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

export default AffiliateCycleApplications;
