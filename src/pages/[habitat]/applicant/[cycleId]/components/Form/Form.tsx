import { useCallback, useState } from 'react';
import { Form as FormioForm, Wizard } from '@formio/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormAnswer,
  TestApplication,
  SubmissionStatus,
  ReviewStatus,
  LazyFormAnswer,
  RootForm,
} from 'models';
import { DataStore, RecursiveModelPredicate } from 'aws-amplify/datastore';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import { usePostHog } from 'posthog-js/react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';

import { useTranslation } from 'react-i18next';
import useAsync from 'hooks/utils/useAsync/useAsync';
import { Status } from 'utils/enums';
import useHabitat from 'hooks/utils/useHabitat';
import FormProps, { DataProps, DISPLAY, ERROR } from './Form.types';
import uploadSubmission from './services/uploadSubmission';
import style from './Form.module.css';
import FormLayout from './layouts/FormLayout';

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Form = ({ application, cycle, formContainer = true }: FormProps) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const { habitat } = useHabitat();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviewSubmission, setReviewSubmission] = useState<any>(undefined);
  const [formReady, setFormReady] = useState<typeof Wizard>();
  const posthog = usePostHog();
  const navigate = useNavigate();
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const { language } = i18n;

  const getData = useCallback(async (): Promise<DataProps> => {
    try {
      if (cycle?.rootformID === undefined)
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };

      const form = await DataStore.query(RootForm, cycle?.rootformID || '');

      const response = await fetch(
        `${FORMIO_URL}/language/submission?data.language=${language}&data.form=${cycle?.formUrl}`
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

      const translations = {
        [`${language}`]: translation,
      };

      const formAnswers = await DataStore.query(
        FormAnswer,
        (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
          c1.testapplicationID.eq(application?.id || ''),
        undefined
      );

      if (!form) {
        return {
          display: DISPLAY.ERROR,
          data: {
            error: ERROR.CYCLE_NOT_FOUND,
          },
        };
      }

      return {
        display: DISPLAY.APPLICATION,
        data: {
          form,
          formAnswers,
          translations,
        },
      };
    } catch (error) {
      return {
        display: DISPLAY.ERROR,
        data: {
          error: ERROR.UNEXPECTED_ERROR,
        },
      };
    }
  }, [cycle?.rootformID, cycle?.formUrl, language, application?.id]);

  const { value, status } = useAsync({
    asyncFunction: getData,
  });

  const handleOnReview = async (submission: unknown) => {
    try {
      if (application && cycle) {
        await uploadSubmission({ submission, application });
        setReviewSubmission(submission);
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  const handleOnSubmit = async () => {
    try {
      if (application && cycle) {
        const original = await DataStore.query(TestApplication, application.id);

        if (original) {
          posthog?.capture('application_submitted', {
            application,
            cycle,
            habitat,
          });
          posthog?.capture('application_pending', {
            application,
            habitat,
            cycle,
          });

          await DataStore.save(
            TestApplication.copyOf(original, (originalApplication) => {
              originalApplication.submissionStatus = SubmissionStatus.COMPLETED;
              originalApplication.reviewStatus = ReviewStatus.PENDING;
              originalApplication.submittedDate = dayjs().format('YYYY-MM-DD');
            })
          );

          navigate('../applications');
        }
      }
    } catch (error) {
      console.log('Error updating application');
    }
  };

  const handleOnClickGoBack = async () => {
    if (application) {
      const currentApplication = await DataStore.query(TestApplication, (c1) =>
        c1.id.eq(application.id)
      );

      if (currentApplication) {
        await DataStore.save(
          TestApplication.copyOf(currentApplication[0], (original) => {
            original.lastPage = 0;
          })
        );
      }
    }

    setReviewSubmission(undefined);
  };

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  const handleFormReady = (f: typeof Wizard) => {
    setFormReady(f);
  };

  const handleNextPage = ({
    submission,
    page,
  }: {
    submission: unknown;
    page: number;
  }) => {
    uploadSubmission({
      submission,
      application,
      nextPage: page,
    });
  };

  if (status === Status.PENDING || !value) {
    return null;
  }

  if (status === Status.REJECTED) {
    return <div>Error</div>;
  }

  if (value.display === DISPLAY.ERROR || !habitat || !cycle || !application) {
    return <div>Error</div>;
  }

  const submission = generateSubmission(value.data.formAnswers || []);
  const src = `${FORMIO_URL}/${cycle?.formUrl}`;

  if (
    reviewSubmission ||
    application?.submissionStatus === SubmissionStatus.COMPLETED
  ) {
    const reviewOptions = {
      readOnly: true,
      renderMode: 'flat',
      language,
      i18n: value.data.translations,
    } as Options;

    return (
      <div style={{ padding: 0 }}>
        <div>
          <div
            className={
              formContainer
                ? style.formContainer
                : `${style.formContainer} ${style.newpadding}`
            }
          >
            <FormioForm
              key={`review-${language}`}
              src={src}
              options={reviewOptions}
              submission={reviewSubmission || submission}
            />

            <Modal
              title={t(
                'pages.habitat.applicant.cycle.components.form.alert.title'
              )}
              width={{ base: '95%', medium: '30rem' }}
              open={showSubmitModal}
              onClickClose={handleOnClickSubmitModalClose}
            >
              <Text>
                {t(
                  'pages.habitat.applicant.cycle.components.form.alert.message'
                )}
              </Text>
              <br />
              <Flex width="100%" justifyContent="end">
                <Button variation="primary" onClick={handleOnSubmit}>
                  {t(
                    'pages.habitat.applicant.cycle.components.form.alert.accept'
                  )}
                </Button>
                <Button onClick={handleOnClickSubmitModalClose}>
                  {t(
                    'pages.habitat.applicant.cycle.components.form.alert.cancel'
                  )}
                </Button>
              </Flex>
            </Modal>
            <Flex justifyContent="space-between">
              {application?.submissionStatus !== SubmissionStatus.COMPLETED ? (
                <>
                  <CustomButton
                    onClick={handleOnClickGoBack}
                    variation="secondary"
                  >
                    {t(
                      'pages.habitat.applicant.cycle.components.form.goBackToEdit'
                    )}
                  </CustomButton>
                  <CustomButton
                    onClick={handleOnClickSubmit}
                    variation="primary"
                  >
                    {t('pages.habitat.applicant.cycle.components.form.submit')}
                  </CustomButton>
                </>
              ) : (
                <Link to="../applications">
                  <CustomButton variation="primary">
                    {t('pages.habitat.applicant.cycle.components.form.goBack')}
                  </CustomButton>
                </Link>
              )}
            </Flex>
          </div>
        </div>
      </div>
    );
  }

  const options = {
    additional: {
      application,
      habitat,
      openCycle: cycle,
    },
    language,
    i18n: value.data.translations,
  } as Options;

  return (
    <div style={{ padding: 0 }}>
      <div>
        <FormLayout
          formReady={formReady}
          application={application}
          cycle={cycle}
        >
          <div
            className={`${style.formContainer}`}
            style={{ padding: '2rem 1rem' }}
          >
            <FormioForm
              key={`real-${language}`}
              src={src}
              onSubmit={handleOnReview}
              options={options}
              submission={submission}
              onNextPage={handleNextPage}
              formReady={handleFormReady}
            />
          </div>
        </FormLayout>
      </div>
    </div>
  );
};

export default Form;
