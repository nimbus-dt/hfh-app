import { Form } from '@formio/react';

import { ApplicationTypes, FormAnswer } from 'models';
import { generateSubmission } from 'utils/formio';

import { ApplicationTabProps } from './ApplicationTab.types';

import PaperApplicationTable from './components/PaperApplicationTable';
import style from './ApplicationTab.module.css';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const ApplicationTab = ({
  application,
  formAnswers,
  formUrl,
}: ApplicationTabProps) => {
  const render = {
    [ApplicationTypes.ONLINE]: (
      <Form
        key="review"
        src={`${FORMIO_URL}/${formUrl}`}
        options={{
          readOnly: true,
          renderMode: 'flat',
        }}
        submission={generateSubmission(formAnswers as FormAnswer[])}
      />
    ),
    [ApplicationTypes.PAPER]: (
      <PaperApplicationTable application={application} />
    ),
    loading: <p>Loading</p>,
  }[application?.type || 'loading'];

  return (
    <div className={style.formContainer}>
      <br />
      {render}
    </div>
  );
};

export default ApplicationTab;
