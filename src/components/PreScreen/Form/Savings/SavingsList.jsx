import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataStore } from 'aws-amplify';
import { Flex, Heading } from '@aws-amplify/ui-react';
import { SavingRecord } from '../../../../models';
import { SavingsDetail } from './SavingsDetail';

export function SavingsList({ items, sizeRenderer }) {
  const [savings, setSavings] = useState([]);

  useEffect(() => {
    setSavings(items);
  }, [items]);

  useEffect(() => {
    const subscription = DataStore.observe(SavingRecord).subscribe(() =>
      fetchSavingRecords()
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchSavingRecords = async () => {
    try {
      const savingRecordObjects = await DataStore.query(SavingRecord);
      setSavings(savingRecordObjects);
    } catch (error) {
      console.log('Error retrieving SavingRecords', error);
    }
  };

  return (
    <div style={{ marginTop: '4' }}>
      <Heading level="5">Saving Records</Heading>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}
      >
        {savings.map((saving) => (
          <SavingsDetail
            key={saving.id}
            item={saving}
            sizeRenderer={sizeRenderer}
          />
        ))}
      </div>
    </div>
  );
}

SavingsList.propTypes = {
  items: PropTypes.array.isRequired,
  sizeRenderer: PropTypes.func.isRequired,
};
