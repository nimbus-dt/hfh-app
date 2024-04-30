import { useCallback, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button, ScrollView } from '@aws-amplify/ui-react';
import { MdArrowBack, MdOutlineOpenInNew, MdFilterList } from 'react-icons/md';

import Chip from 'components/Chip';
import TableWithPaginator from 'components/TableWithPaginator';

import Loading from 'components/Loading';
import Error from 'components/Error';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Habitat, TestCycle } from 'models';
import { Status } from 'utils/enums';

import Filters from './components/filters';
import styles from './styles.module.css';
import headers from './utils/headers';
import { Inputs } from './types';

interface OutletContextProps {
  habitat?: Habitat;
}

const CyclesPage = () => {
  const context = useOutletContext<OutletContextProps>();
  const habitat = context?.habitat;
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Inputs>({
    startDate: '',
    endDate: '',
    status: null,
  });

  const getCycles = useCallback(async () => {
    if (habitat) {
      return habitat.TestCycles.toArray();
    }
  }, [habitat]);

  const { value, status } = useAsync({
    asyncFunction: getCycles,
  });

  if (status === Status.REJECTED) {
    return <Error />;
  }

  if (status === Status.PENDING || !value) {
    return <Loading />;
  }

  const cycles = value?.map(
    ({ id, startDate, endDate, isOpen }: TestCycle) => ({
      id,
      name: 'Spring Application Cycle 01',
      startDate,
      endDate,
      status: isOpen ? 'Open' : 'Closed',
    })
  );

  console.log(filters);
  console.log(value);

  return (
    <div className={styles.page}>
      <div className={styles.cta}>
        <div
          className={`theme-body-medium ${styles.hide_on_small} ${styles.breadcrumb}`}
        >
          <p className={styles.neutral_80}>Homeownership Form</p>
          <p className={styles.hide_on_small}>&gt;</p>
          <p>Cycles</p>
        </div>
        <div className={styles.title}>
          <MdArrowBack className={styles.hide_on_small} size="24px" />
          <p className="theme-headline-medium">Cycles Dashboard</p>
        </div>
      </div>
      <div className={styles.applications}>
        <div className={styles.table_options}>
          <div className={styles.table_title}>
            <p className={`${styles.neutral_100} theme-subtitle-s2`}>Cycles</p>
            <p className={`${styles.neutral_80} theme-body-small`}>
              15 results
            </p>
          </div>
          <div className={styles.options}>
            <div
              className={styles.filters}
              onClick={() => {
                setShowFilters((prev) => !prev);
              }}
              aria-hidden="true"
            >
              <MdFilterList size="24px" />
            </div>
            <Button variation="primary">New Cycle +</Button>
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
                  <Button variation="link" padding="0">
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
    </div>
  );
};

export default CyclesPage;
