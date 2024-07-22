import { Form, Wizard } from '@formio/react';
import { Options } from '@formio/react/lib/components/Form';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Status } from 'utils/enums';

declare global {
  interface Window {
    hfhSetSubmission: typeof Wizard;
  }
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Print = () => {
  const [searchParams] = useSearchParams();

  const formUrl = searchParams.get('formUrl');

  const language = searchParams.get('language') || 'en';

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

  return (
    <Form
      src={`${FORMIO_URL}/${formUrl}`}
      options={
        {
          readOnly: true,
          renderMode: 'flat',
          language,
          i18n: value,
        } as Options
      }
      formReady={(form: typeof Wizard) =>
        (window.hfhSetSubmission = (submission: unknown) =>
          (form.submission = submission))
      }
    />
  );
};

export default Print;
