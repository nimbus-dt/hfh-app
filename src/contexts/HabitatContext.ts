import { Habitat } from 'models';
import { createContext } from 'react';

interface IHabitatContext {
  habitat: Habitat | undefined;
  setHabitat: (habitat: Habitat) => void;
}

const HabitatContext = createContext<IHabitatContext>({
  habitat: undefined,
  setHabitat: () => undefined,
});

export default HabitatContext;
