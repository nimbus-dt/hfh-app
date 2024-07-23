import { ReactNode } from 'react';

import { TestApplication, TestCycle } from 'models';

import { Wizard } from '@formio/react';

interface FormLayoutProps {
  formReady?: typeof Wizard;
  cycle: TestCycle;
  application: TestApplication;
  children: ReactNode;
}

export default FormLayoutProps;
