import { ReactNode } from 'react';

import { Habitat, TestApplication, TestCycle } from 'models';

import { Wizard } from '@formio/react';

interface FormLayoutProps {
  formReady?: typeof Wizard;
  habitat?: Habitat;
  children: ReactNode;
  application?: TestApplication;
  cycle?: TestCycle;
}

export default FormLayoutProps;
