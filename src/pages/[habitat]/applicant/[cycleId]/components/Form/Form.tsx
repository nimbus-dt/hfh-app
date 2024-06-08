import { type ReactNode, useMemo, useState, useRef } from 'react';
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
import { throttle } from 'lodash';
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
import Header from 'components/Header';
import Footer from 'components/Footer';
import Loading from 'components/Loading';
import style from './Form.module.css';

interface IProperties {
  habitat?: Habitat;
  application?: TestApplication;
  cycle?: TestCycle;
  formContainer?: boolean;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getPage = (formReady: any) => {
  const pagesCount = formReady?.components;
  if (!pagesCount) return 0;
  const lastPageComponents =
    pagesCount[pagesCount.length - 1]?.components[0]?.components;
  if (!lastPageComponents) return 0;
  return lastPageComponents[lastPageComponents.length - 1].component.value;
};

const Layout = ({
  formReady,
  habitat,
  children,
  application,
  cycle,
}: {
  formReady?: typeof Wizard;
  habitat?: Habitat;
  children: ReactNode;
  application?: TestApplication;
  cycle?: TestCycle;
}) => {
  const posthog = usePostHog();

  const [currentPage, setCurrentPage] = useState(0);
  const pages = getPage(formReady);
  const headerRef = useRef<HTMLDivElement>(null);
  return (
    <div style={{ width: '100%' }}>
      {!formReady && <Loading />}
      {formReady && (
        <div ref={headerRef}>
          <Header current={currentPage} pages={pages} habitat={habitat} />
        </div>
      )}
      {children}
      {formReady && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Footer
            goBack={
              currentPage === 0
                ? undefined
                : () => {
                    headerRef.current?.scrollIntoView();
                    setCurrentPage((prev) => prev - 1);
                    formReady
                      .prevPage()
                      .then(() => {
                        posthog?.capture(
                          `form_previous_from_page_${
                            currentPage + 1
                          }_to_page_${currentPage}`,
                          {
                            data: formReady.data[`page${currentPage + 1}`],
                            habitat,
                            cycle,
                            application,
                          }
                        );
                      })
                      .catch(
                        (
                          error:
                            | string
                            | { message: string; formattedKeyOrPath: string }[]
                        ) => {
                          if (typeof error === 'string') {
                            posthog?.capture(
                              `form_previous_from_page_${
                                currentPage + 1
                              }_to_page_${currentPage}`,
                              {
                                data: formReady.data[`page${currentPage + 1}`],
                                habitat,
                                cycle,
                                application,
                                error,
                              }
                            );
                          } else {
                            posthog?.capture(
                              `form_previous_error_from_page_${
                                currentPage + 1
                              }_to_page_${currentPage}`,
                              {
                                data: formReady.data[`page${currentPage + 1}`],
                                habitat,
                                cycle,
                                application,
                                error: error.reduce(
                                  (acc, { message, formattedKeyOrPath }) => {
                                    acc[formattedKeyOrPath] = message;
                                    return acc;
                                  },
                                  {} as { [key: string]: string }
                                ),
                              }
                            );
                          }
                        }
                      );
                  }
            }
            onNext={() => {
              headerRef.current?.scrollIntoView();
              if (
                formReady?.componentComponents &&
                currentPage === formReady.componentComponents.length - 1
              ) {
                formReady
                  .submit()
                  .then(() => {
                    posthog?.capture(
                      `form_submit_from_page_${currentPage + 1}`,
                      {
                        data: formReady.data[`page${currentPage + 1}`],
                        habitat,
                        cycle,
                        application,
                      }
                    );
                  })
                  .catch(
                    (
                      error: { message: string; formattedKeyOrPath: string }[]
                    ) => {
                      posthog?.capture(
                        `form_submit_error_from_page_${currentPage + 1}`,
                        {
                          data: formReady.data[`page${currentPage + 1}`],
                          habitat,
                          cycle,
                          application,
                          error: error.reduce(
                            (acc, { message, formattedKeyOrPath }) => {
                              acc[formattedKeyOrPath] = message;
                              return acc;
                            },
                            {} as { [key: string]: string }
                          ),
                        }
                      );
                    }
                  );
                return;
              }
              setCurrentPage((prev) => prev + 1);
              formReady
                .nextPage()
                .then(() => {
                  posthog?.capture(
                    `form_next_from_page_${currentPage + 1}_to_page_${
                      currentPage + 2
                    }`,
                    {
                      data: formReady.data[`page${currentPage + 1}`],
                      habitat,
                      cycle,
                      application,
                    }
                  );
                })
                .catch(
                  (
                    error: { message: string; formattedKeyOrPath: string }[]
                  ) => {
                    posthog?.capture(
                      `form_next_error_from_page_${currentPage + 1}_to_page_${
                        currentPage + 2
                      }`,
                      {
                        data: formReady.data[`page${currentPage + 1}`],
                        habitat,
                        cycle,
                        application,
                        error: error.reduce(
                          (acc, { message, formattedKeyOrPath }) => {
                            acc[formattedKeyOrPath] = message;
                            return acc;
                          },
                          {} as { [key: string]: string }
                        ),
                      }
                    );
                    setCurrentPage((prev) => prev - 1);
                  }
                );
            }}
            submit={
              formReady?.componentComponents &&
              currentPage === formReady.componentComponents.length - 1
            }
          />
        </div>
      )}
    </div>
  );
};

const Form = ({
  habitat,
  application,
  cycle,
  formContainer = true,
}: IProperties) => {
  const [reviewMode, setReviewMode] = useState(false);
  const [formReady, setFormReady] = useState<typeof Wizard>();
  const posthog = usePostHog();

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const { data: formAnswers }: { data: FormAnswer[] } = useFormAnswersQuery({
    criteria: (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application, reviewMode],
    paginationProducer: undefined,
  });

  const navigate = useNavigate();

  const { data: form } = useFormById({
    id: cycle?.rootformID || '',
    dependencyArray: [cycle],
  });

  const persistSubmission = useMemo(
    () =>
      throttle(
        async (submission, nextPage?: number) => {
          try {
            if (application) {
              const submissionEntries = Object.entries(submission.data);

              const [page, values] =
                submissionEntries[
                  nextPage ? nextPage - 1 : submissionEntries.length - 1
                ];

              const persistedFormAnswer = await DataStore.query(
                FormAnswer,
                (c1) =>
                  c1.and((c2) => {
                    const criteriaArray = [
                      c2.testapplicationID.eq(application.id),
                      c2.page.eq(page),
                    ];

                    return criteriaArray;
                  })
              );

              if (persistedFormAnswer.length > 0) {
                await DataStore.save(
                  FormAnswer.copyOf(persistedFormAnswer[0], (original) => {
                    original.values = JSON.stringify(values);
                  })
                );
              } else {
                await DataStore.save(
                  new FormAnswer({
                    testapplicationID: application.id,
                    page,
                    values: JSON.stringify(values),
                  })
                );
              }
            }

            console.log('submission persisted');
          } catch (error) {
            console.log('Error persisting submission', error);
          }
        },
        50,
        { leading: true, trailing: false }
      ),
    [application]
  );

  const handleOnReview = async (submission: unknown) => {
    try {
      if (application && cycle) {
        await persistSubmission(submission);
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

  const handleOnClickGoBack = () => {
    setReviewMode(false);
  };

  const handleOnClickSubmit = () => {
    setShowSubmitModal(true);
  };

  const handleOnClickSubmitModalClose = () => {
    setShowSubmitModal(false);
  };

  return (
    form && (
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
            <Layout
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
                  key="real"
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
                    persistSubmission(submission, page);
                  }}
                />
              </div>
            </Layout>
          )}
        </div>
      </div>
    )
  );
};

export default Form;
