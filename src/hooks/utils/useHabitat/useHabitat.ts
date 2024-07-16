import HabitatContext from 'contexts/HabitatContext';
import { useContext } from 'react';

const useHabitat = () => {
  const { habitat, setHabitat } = useContext(HabitatContext);

  return { habitat, setHabitat };
};

export default useHabitat;
