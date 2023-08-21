import React, { useEffect } from 'react';
import { DataStore } from 'aws-amplify';
import { Cycles } from '../../models'; // Adjust the import path

function CycleTime() {
  // Function to update cycle status
  const updateCycleStatus = async () => {
    try {
      const allCycles = await DataStore.query(Cycles);

      const updatedCycles = allCycles.map((cycle) => {
        const currentDate = new Date();
        const isWithinCycle =
          currentDate >= new Date(cycle.cycleStartDate) &&
          currentDate <= new Date(cycle.cycleEndDate);

        return {
          ...cycle,
          cycleStatus: isWithinCycle,
        };
      });

      // Save updated cycles
      await Promise.all(
        updatedCycles.map(async (updatedCycle) => {
          await DataStore.save(Cycles, {
            ...updatedCycle,
          });
        })
      );
    } catch (error) {
      console.error('Error updating cycle status:', error);
    }
  };

  useEffect(() => {
    // Schedule the update function to run once a day
    const updateInterval = setInterval(updateCycleStatus, 24 * 60 * 60 * 1000); // 24 hours
    updateCycleStatus(); // Update immediately when the component mounts
    return () => clearInterval(updateInterval);
  }, []);

  return (
    <div>
      <p>Cycle statuses will be updated automatically once a day.</p>
    </div>
  );
}

export default CycleTime;
