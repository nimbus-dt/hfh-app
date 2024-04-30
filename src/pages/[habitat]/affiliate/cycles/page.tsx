import { useState } from 'react';
import { Button, ScrollView } from '@aws-amplify/ui-react';
import { MdArrowBack, MdOutlineOpenInNew, MdFilterList } from 'react-icons/md';

import Chip from 'components/Chip';
import TableWithPaginator from 'components/TableWithPaginator';

import BreadCrumbs from 'components/BreadCrumbs/BreadCrumbs';
import Filters from './components/filters';
import styles from './styles.module.css';
import headers from './utils/headers';

const CyclesPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
  });

  const cycles = [
    {
      id: '1',
      name: 'Spring Application Cycle 01',
      startDate: '04/20/2024',
      endDate: '04/20/2024',
      status: 'Closed',
    },
    {
      id: '2',
      name: 'Spring Application Cycle 02',
      startDate: '04/20/2024',
      endDate: '04/20/2024',
      status: 'Open',
    },
    {
      id: '3',
      name: 'Spring Application Cycle 03',
      startDate: '04/24/2023',
      endDate: '04/20/2124',
      status: 'Closed',
    },
    {
      id: '4',
      name: 'Spring Application Cycle 04',
      startDate: '04/22/2022',
      endDate: '04/23/2023',
      status: 'Open',
    },
  ];

  return (
    <ScrollView height="100vh" className={styles.page}>
      <div className={styles.cta}>
        <BreadCrumbs
          items={[
            { label: 'Homeownership Form' },
            {
              label: 'Cycles',
            },
          ]}
        />
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
      {showFilters && <Filters close={() => setShowFilters(false)} />}
    </ScrollView>
  );
};

export default CyclesPage;
