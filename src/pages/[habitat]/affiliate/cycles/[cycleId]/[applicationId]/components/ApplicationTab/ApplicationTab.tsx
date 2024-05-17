import { Form } from '@formio/react';
import { ApplicationTypes, FormAnswer, TestApplication } from 'models';

import { generateSubmission } from 'utils/formio';
import PaperApplicationTable from './components/PaperApplicationTable';
import style from './ApplicationTab.module.css';

interface IProperties {
  application?: TestApplication;
  formAnswers: unknown[];
  formUrl: string;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const ApplicationTab = ({ application, formAnswers, formUrl }: IProperties) => (
  <div className={style.formContainer}>
    <br />
    <Form
      key="review"
      src={`${FORMIO_URL}/${formUrl}`}
      options={{
        readOnly: true,
        renderMode: 'flat',
      }}
      submission={generateSubmission(formAnswers as FormAnswer[])}
    />
    {application?.type === ApplicationTypes.PAPER && (
      <PaperApplicationTable application={application} />
    )}
  </div>
);

export default ApplicationTab;
