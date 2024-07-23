import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Form } from '@formio/react';

import { ApplicationTypes, FormAnswer } from 'models';
import { generateSubmission } from 'utils/formio';
import useAsync from 'hooks/utils/useAsync/useAsync';

import { Status } from 'utils/enums';
import { Options } from '@formio/react/lib/components/Form';
import { ApplicationTabProps } from './ApplicationTab.types';
import PaperApplicationTable from './components/PaperApplicationTable';
import style from './ApplicationTab.module.css';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const ApplicationTab = ({
  application,
  formAnswers,
  formUrl,
}: ApplicationTabProps) => {
  const { i18n } = useTranslation();
  const { language } = i18n;

  const fetchI18n = useCallback(async (): Promise<{
    [key: string]: unknown;
  }> => {
    const response = await fetch(
      `${FORMIO_URL}/language/submission?data.language=${language}&data.form=${formUrl}`
    );
    const array = await response.json();
    const { data } = array[0];
    const { translation } = data;
    Object.keys(translation).forEach((key) => {
      const newKey = key.replace(/__DOT__/g, '.');
      translation[newKey] = translation[key];
      if (newKey !== key) {
        delete translation[key];
      }
    });
    return {
      [`${language}`]: translation,
    };
  }, [formUrl, language]);

  const { value, status } = useAsync({
    asyncFunction: fetchI18n,
  });

  if (status === Status.PENDING) {
    return <div>Loading...</div>;
  }

  if (status === Status.REJECTED) {
    return <div>Error</div>;
  }

  const render = {
    [ApplicationTypes.ONLINE]: (
      <Form
        key={`review-${language}`}
        src={`${FORMIO_URL}/${formUrl}`}
        options={
          {
            readOnly: true,
            renderMode: 'flat',
            language,
            i18n: value,
          } as Options
        }
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
