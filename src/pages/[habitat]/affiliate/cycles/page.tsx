import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { DataStore, SortDirection } from 'aws-amplify/datastore';
import { Button, useBreakpointValue } from '@aws-amplify/ui-react';
import { MdOutlineOpenInNew, MdFilterList } from 'react-icons/md';
import { throttle } from 'lodash';
import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import Chip from 'components/Chip';
import Loading from 'components/Loading';
import Error from 'components/Error';
import GoBack from 'components/GoBack';
import TableWithPaginator from 'components/TableWithPaginator';
import { useRootFormById } from 'hooks/services';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { RootForm, TestCycle } from 'models';
import { convertDateYYYYMMDDtoDDMMYYYY } from 'utils/dates';
import { Status } from 'utils/enums';
import useHabitat from 'hooks/utils/useHabitat';
import CustomButton from 'components/CustomButton';
import ResultsCounter from 'components/ResultsCounter';
import Filters from './components/filters';
import NewCycle from './components/newCycle';
import styles from './styles.module.css';
import { Inputs } from './types';
import CycleButton from './components/CycleButton';

const CyclesPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { formId } = useParams();

  const { habitat } = useHabitat();

  const [showFilters, setShowFilters] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const [filters, setFilters] = useState<Inputs>({
    startDate: '',
    endDate: '',
    status: null,
  });

  const isSmall = useBreakpointValue({
    base: true,
    medium: false,
  }) as boolean;

  const { data: rootForm }: { data: RootForm | null } = useRootFormById({
    id: formId,
    dependencyArray: [formId],
  });

  const getCycles = useCallback(async () => {
    if (habitat) {
      const cyclesResponse = await DataStore.query(
        TestCycle,
        (c1) =>
          c1.and((c2) => {
            const criteriaArray = [];

            if (formId) {
              criteriaArray.push(c2.rootformID.eq(formId));
            }

            if (filters?.status === 'open' || filters.status === 'close') {
              criteriaArray.push(c2.isOpen.eq(filters.status === 'open'));
            }

            if (filters?.startDate) {
              criteriaArray.push(c2.startDate.ge(filters.startDate));
            }

            if (filters?.endDate) {
              criteriaArray.push(c2.endDate.le(filters.endDate));
            }

            return criteriaArray;
          }),
        {
          sort: (s) => s.startDate(SortDirection.DESCENDING),
        }
      );

      const openCyclesResponse = await DataStore.query(TestCycle, (c1) =>
        c1.and((c2) => {
          const criteriaArray = [c2.isOpen.eq(true)];

          if (formId) {
            criteriaArray.push(c2.rootformID.eq(formId));
          }

          return criteriaArray;
        })
      );

      return {
        cycles: cyclesResponse,
        openCycles: openCyclesResponse,
      };
    }
  }, [filters, habitat, formId]);

  const { execute, value, status } = useAsync({
    asyncFunction: getCycles,
  });

  const onClickView = (id: string) => {
    navigate(`./${id}`);
  };

  if (status === Status.REJECTED) {
    return <Error />;
  }

  if (status === Status.PENDING || !value) {
    return <Loading />;
  }

  const cycles = value.cycles?.map(
    ({ id, name, startDate, endDate, isOpen, createdAt }: TestCycle) => ({
      id,
      name,
      startDate: convertDateYYYYMMDDtoDDMMYYYY(startDate.split('T')[0]),
      endDate: endDate ? convertDateYYYYMMDDtoDDMMYYYY(endDate) : '',
      status: isOpen,
      createdAt,
    })
  );

  const breadCrumbsItems = [
    { label: t('pages.habitat.affiliate.forms.name'), to: '../forms' },
    {
      label: t('pages.habitat.affiliate.cycles.name'),
    },
  ];

  return (
    <div className={styles.page}>
      <div className={styles.cta}>
        <BreadCrumbs items={breadCrumbsItems} />
        <div className={styles.title}>
          <GoBack to="../forms" />
          <p className="theme-headline-medium">
            {t('pages.habitat.affiliate.cycles.title')}
          </p>
        </div>
      </div>
      <div className={styles.applications}>
        <div className={styles.table_options}>
          <div className={styles.table_title}>
            <p className={`${styles.neutral_100} theme-subtitle-s2`}>
              {t('pages.habitat.affiliate.cycles.table.title')}
            </p>
            <ResultsCounter number={cycles.length} />
          </div>
          <div className={styles.options}>
            <CustomButton
              onClick={throttle(() => {
                setShowFilters((prev) => !prev);
              }, 500)}
              icon={isSmall ? undefined : <MdFilterList />}
            >
              {isSmall ? (
                <MdFilterList size="24px" />
              ) : (
                t('pages.habitat.affiliate.cycles.button.filter')
              )}
            </CustomButton>
            <CycleButton
              isSmall={isSmall}
              isACycleOpen={value.openCycles.length > 0}
              onClick={throttle(() => {
                setShowModal(true);
              }, 500)}
            />
          </div>
        </div>
        <TableWithPaginator
          headers={[
            {
              id: 'name',
              value: t('pages.habitat.affiliate.cycles.table.name'),
            },
            {
              id: 'startDate',
              value: t('pages.habitat.affiliate.cycles.table.startDate'),
            },
            {
              id: 'endDate',
              value: t('pages.habitat.affiliate.cycles.table.endDate'),
            },
            {
              id: 'status',
              value: t('pages.habitat.affiliate.cycles.table.status'),
            },
            {
              id: 'view',
              value: t('pages.habitat.affiliate.cycles.table.view'),
            },
          ]}
          data={cycles.map((data) => ({
            id: data.id,
            cells: [
              { value: data.name, id: 'name' },
              { value: data.startDate, id: 'startDate' },
              { value: data.endDate, id: 'endDate' },
              {
                value: (
                  <Chip
                    variation={data.status ? 'success' : 'danger'}
                    text={
                      data.status
                        ? t('pages.habitat.affiliate.cycles.status.open')
                        : t('pages.habitat.affiliate.cycles.status.closed')
                    }
                  />
                ),
                id: 'status',
              },
              {
                value: (
                  <Button
                    variation="link"
                    padding="0"
                    onClick={throttle(() => onClickView(data.id), 500)}
                  >
                    <MdOutlineOpenInNew
                      size="24px"
                      color="var(--amplify-colors-neutral-90)"
                    />
                  </Button>
                ),
                id: 'view',
              },
            ],
          }))}
        />
      </div>
      {showFilters && (
        <Filters
          filters={filters}
          setFilters={(data) => setFilters(data)}
          close={() => setShowFilters(false)}
        />
      )}
      {showModal && (
        <NewCycle
          refetch={execute}
          openCycle={
            value.openCycles.length > 0 ? value.openCycles[0] : undefined
          }
          rootForm={rootForm}
          open={showModal}
          close={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CyclesPage;
