import { useEffect, useState } from 'react';
import { Form as FormioForm, Wizard } from '@formio/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FormAnswer,
  Habitat,
  TestApplication,
  TestCycle,
  SubmissionStatus,
  ReviewStatus,
  LazyFormAnswer,
} from 'models';
import { DataStore } from 'aws-amplify';
import { generateSubmission } from 'utils/formio';
import { Options } from '@formio/react/lib/components/Form';
import { useFormAnswersQuery, useFormById } from 'hooks/services';
import Modal from 'components/Modal';
import dayjs from 'dayjs';
import { usePostHog } from 'posthog-js/react';
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import { RecursiveModelPredicate } from '@aws-amplify/datastore';
import { useTranslation } from 'react-i18next';
import uploadSubmission from './services/uploadSubmission';
import style from './Form.module.css';
import FormLayout from './layouts/FormLayout';

interface IProperties {
  habitat?: Habitat;
  application?: TestApplication;
  cycle?: TestCycle;
  formContainer?: boolean;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Form = ({
  habitat,
  application,
  cycle,
  formContainer = true,
}: IProperties) => {
  const { i18n: i18next } = useTranslation();
  const [reviewMode, setReviewMode] = useState(false);
  const [formReady, setFormReady] = useState<typeof Wizard>();
  const [i18n, setI18n] = useState<{ [key: string]: unknown }>();
  const posthog = usePostHog();

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const { data: formAnswers }: { data: FormAnswer[] } = useFormAnswersQuery({
    criteria: (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application, reviewMode],
    paginationProducer: undefined,
  });
  const { language } = i18next;

  useEffect(() => {
    const fetchI18n = async () => {
      const response = await fetch(
        `https://form.habitat-app.org/jcxuakumlexxzla/language/submission?data.language=${language}`
      );
      const array = await response.json();
      const { data } = array[0];
      const { translation } = data;
      console.log(translation);
      setI18n({
        [`${language}`]: translation,
      });
    };
    fetchI18n();
  }, [language]);

  const navigate = useNavigate();

  const { data: form } = useFormById({
    id: cycle?.rootformID || '',
    dependencyArray: [cycle],
  });

  const handleOnReview = async (submission: unknown) => {
    try {
      if (application && cycle) {
        await uploadSubmission({ submission, application });
        setReviewMode(true);
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

    setReviewMode(false);
  };

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  return (
    form &&
    i18n && (
      <div style={{ padding: 0 }}>
        <div>
          {reviewMode ||
          application?.submissionStatus === SubmissionStatus.COMPLETED ? (
            <div
              className={
                formContainer
                  ? style.formContainer
                  : `${style.formContainer} ${style.newpadding}`
              }
            >
              <FormioForm
                key="review"
                src={`${FORMIO_URL}/${cycle?.formUrl}`}
                options={{
                  readOnly: true,
                  renderMode: 'flat',
                }}
                submission={generateSubmission(formAnswers)}
              />
              <Modal
                title="Alert"
                width={{ base: '95%', medium: '30rem' }}
                open={showSubmitModal}
                onClickClose={handleOnClickSubmitModalClose}
              >
                <Text>
                  Are you sure you want to submit your application? Once
                  submited you won't be able to resubmit.
                </Text>
                <br />
                <Flex width="100%" justifyContent="end">
                  <Button variation="primary" onClick={handleOnSubmit}>
                    Accept
                  </Button>
                  <Button onClick={handleOnClickSubmitModalClose}>
                    Cancel
                  </Button>
                </Flex>
              </Modal>
              <Flex justifyContent="space-between">
                {application?.submissionStatus !==
                SubmissionStatus.COMPLETED ? (
                  <>
                    <CustomButton
                      onClick={handleOnClickGoBack}
                      variation="secondary"
                    >
                      Go back to edit
                    </CustomButton>
                    <CustomButton
                      onClick={handleOnClickSubmit}
                      variation="primary"
                    >
                      Submit
                    </CustomButton>
                  </>
                ) : (
                  <Link to="../applications">
                    <CustomButton variation="primary">Go back</CustomButton>
                  </Link>
                )}
              </Flex>
            </div>
          ) : (
            <FormLayout
              formReady={formReady}
              habitat={habitat}
              application={application}
              cycle={cycle}
            >
              <div
                className={`${style.formContainer}`}
                style={{ padding: '2rem 1rem' }}
              >
                <FormioForm
                  key={`real-${language}`}
                  src={`${FORMIO_URL}/${cycle?.formUrl}`}
                  onSubmit={handleOnReview}
                  formReady={(f: typeof Wizard) => setFormReady(f)}
                  options={
                    {
                      additional: {
                        application,
                        habitat,
                        openCycle: cycle,
                      },
                      language,
                      i18n,
                    } as Options
                  }
                  submission={generateSubmission(formAnswers)}
                  onNextPage={({
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
                  }}
                />
              </div>
            </FormLayout>
          )}
        </div>
      </div>
    )
  );
};

export default Form;
