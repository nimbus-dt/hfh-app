import { Habitat } from 'models';
import React, { useMemo, useState } from 'react';
import HabitatContext from 'contexts/HabitatContext';

const HabitatProvider = () => {
  const [habitat, setHabitat] = useState<Habitat>();

  const contextValue = useMemo(
    () => ({ habitat, setHabitat }),
    [habitat, setHabitat]
  );

  return <HabitatContext.Provider value={contextValue} />;
};

export default HabitatProvider;
