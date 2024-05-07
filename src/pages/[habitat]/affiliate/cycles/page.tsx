import { useCallback, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { DataStore, SortDirection } from 'aws-amplify';
import { Button } from '@aws-amplify/ui-react';
import { MdArrowBack, MdOutlineOpenInNew, MdFilterList } from 'react-icons/md';
import { throttle } from 'lodash';

import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import Chip from 'components/Chip';
import Loading from 'components/Loading';
import Error from 'components/Error';
import TableWithPaginator from 'components/TableWithPaginator';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Habitat, RootForm, TestCycle } from 'models';
import { Status } from 'utils/enums';

import { dateOnly } from 'utils/dates';
import Filters from './components/filters';
import NewCycle from './components/newCycle';
import styles from './styles.module.css';
import headers from './utils/headers';
import { Inputs } from './types';

interface OutletContextProps {
  habitat?: Habitat;
}

const CyclesPage = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  const context = useOutletContext<OutletContextProps>();
  const habitat = context?.habitat;
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState<Inputs>({
    startDate: '',
    endDate: '',
    status: null,
  });

  const getCycles = useCallback(async () => {
    if (habitat) {
      const cyclesResponse = await DataStore.query(
        TestCycle,
        (c1) =>
          c1.and((c2) => {
            const criteriaArray = [c2.rootformID.eq(formId)];

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
          const criteriaArray = [c2.rootformID.eq(formId), c2.isOpen.eq(true)];

          return criteriaArray;
        })
      );

      const formResponse = await DataStore.query(RootForm, (c1) =>
        c1.and((c2) => {
          const criteriaArray = [c2.habitatID.eq(habitat.id)];

          if (formId) {
            criteriaArray.push(c2.id.eq(formId));
          }

          return criteriaArray;
        })
      );

      return {
        formName: formResponse[0].name,
        cycles: cyclesResponse,
        openCycles: openCyclesResponse,
      };
    }
  }, [filters, habitat, formId]);

  const { execute, value, status } = useAsync({
    asyncFunction: getCycles,
  });

  const onGoBack = () => {
    navigate('../forms');
  };

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
      startDate: dateOnly(startDate.split('T')[0]),
      endDate: endDate ? dateOnly(endDate) : '',
      status: isOpen ? 'Open' : 'Closed',
      createdAt,
    })
  );

  const { formName } = value;

  return (
    <div className={styles.page}>
      <div className={styles.cta}>
        <BreadCrumbs
          items={[
            { label: `${formName}`, to: '../forms' },
            {
              label: 'Cycles',
            },
          ]}
        />
        <div className={styles.title}>
          <MdArrowBack
            className={styles.hide_on_small}
            style={{ cursor: 'pointer' }}
            size="24px"
            onClick={onGoBack}
          />
          <p className="theme-headline-medium">Cycles Dashboard</p>
        </div>
      </div>
      <div className={styles.applications}>
        <div className={styles.table_options}>
          <div className={styles.table_title}>
            <p className={`${styles.neutral_100} theme-subtitle-s2`}>Cycles</p>
            <p className={`${styles.neutral_80} theme-body-small`}>
              {cycles.length} results
            </p>
          </div>
          <div className={styles.options}>
            <div
              className={styles.filters}
              onClick={throttle(() => {
                setShowFilters((prev) => !prev);
              }, 500)}
              aria-hidden="true"
            >
              <MdFilterList size="24px" />
            </div>
            <Button
              onClick={throttle(() => {
                setShowModal(true);
              }, 500)}
              variation="primary"
            >
              {value.openCycles.length > 0 ? 'Close Cycle' : 'New Cycle +'}
            </Button>
          </div>
        </div>
        <TableWithPaginator
          headers={headers}
          data={cycles.map((data) => ({
            id: data.id,
            cells: [
              { value: data.name, id: 'name' },
              { value: data.startDate, id: 'startDate' },
              { value: data.endDate, id: 'endDate' },
              {
                value: (
                  <Chip
                    variation={data.status === 'Open' ? 'success' : 'danger'}
                    text={data.status}
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
          formId={formId}
          habitat={habitat}
          open={showModal}
          close={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CyclesPage;
