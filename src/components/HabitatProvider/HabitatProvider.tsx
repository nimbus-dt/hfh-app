import { Habitat } from 'models';
import React, { useMemo, useState } from 'react';
import HabitatContext from 'contexts/HabitatContext';

interface IProperties {
  children: React.ReactNode;
}

const HabitatProvider = ({ children }: IProperties) => {
  const [habitat, setHabitat] = useState<Habitat>();

  const contextValue = useMemo(
    () => ({ habitat, setHabitat }),
    [habitat, setHabitat]
  );

  return (
    <HabitatContext.Provider value={contextValue}>
      {children}
    </HabitatContext.Provider>
  );
};

export default HabitatProvider;
