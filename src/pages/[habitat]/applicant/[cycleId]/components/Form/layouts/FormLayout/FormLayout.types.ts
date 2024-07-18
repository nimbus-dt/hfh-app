import { ReactNode } from 'react';

import { TestApplication, TestCycle } from 'models';

import { Wizard } from '@formio/react';

interface FormLayoutProps {
  formReady?: typeof Wizard;
  children: ReactNode;
  application?: TestApplication;
  cycle?: TestCycle;
}

export default FormLayoutProps;
