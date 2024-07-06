import { TestApplication, TestCycle } from 'models';

/* eslint-disable no-shadow */
export const enum DISPLAY {
  ERROR = 'error',
  NO_OPEN_CYCLE = 'noOpenCycle',
  APPLICATION = 'application',
  COMPLETED = 'completed',
  REVIEW = 'review',
}

export const enum ERROR {
  HABITAT_NOT_FOUND = 'Habitat not found',
  CYCLE_NOT_FOUND = 'Cycle not found',
  CYCLE_NOT_OPEN = 'Cycle not open',
  UNEXPECTED_ERROR = 'Unexpected error',
}

interface DisplayErrorProps {
  display: DISPLAY.ERROR;
  data: {
    error: string;
  };
}

interface DisplayApplicationProps {
  display: DISPLAY.APPLICATION;
  data: {
    cycle: TestCycle;
    application: TestApplication;
  };
}

interface DisplayReviewProps {
  display: DISPLAY.REVIEW;
  data: {
    cycle: TestCycle;
    application: TestApplication;
  };
}

interface DisplayNoOpenCycleProps {
  display: DISPLAY.NO_OPEN_CYCLE;
  data: {
    error: ERROR;
    cycle: TestCycle;
    application?: TestApplication;
  };
}

interface DisplayCompletedProps {
  display: DISPLAY.COMPLETED;
  data: {
    cycle: TestCycle;
    application: TestApplication;
  };
}

export type DataProps =
  | DisplayErrorProps
  | DisplayApplicationProps
  | DisplayReviewProps
  | DisplayNoOpenCycleProps
  | DisplayCompletedProps;
