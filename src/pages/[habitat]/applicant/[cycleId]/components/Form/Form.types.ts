/* eslint-disable no-shadow */
import {
  Habitat,
  LazyFormAnswer,
  LazyRootForm,
  TestApplication,
  TestCycle,
} from 'models';

export const enum DISPLAY {
  ERROR = 'error',
  APPLICATION = 'application',
}

export const enum ERROR {
  CYCLE_NOT_FOUND = 'Cycle not found',
  UNEXPECTED_ERROR = 'Unexpected error',
}

interface DisplayErrorProps {
  display: DISPLAY.ERROR;
  data: {
    error: ERROR;
  };
}

interface DisplayFormProps {
  display: DISPLAY.APPLICATION;
  data: {
    form: LazyRootForm;
    formAnswers: LazyFormAnswer[];
  };
}

export type DataProps = DisplayErrorProps | DisplayFormProps;

interface FormProps {
  habitat?: Habitat;
  application?: TestApplication;
  cycle?: TestCycle;
  formContainer?: boolean;
}

export default FormProps;
