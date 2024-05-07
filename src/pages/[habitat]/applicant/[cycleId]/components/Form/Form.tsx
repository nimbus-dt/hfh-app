import React, { useMemo, useState } from 'react';
import { Form as FormioForm } from '@formio/react';
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
import { Button, Flex, Text } from '@aws-amplify/ui-react';
import CustomButton from 'components/CustomButton/CustomButton';
import { RecursiveModelPredicate } from '@aws-amplify/datastore';
import style from './Form.module.css';

interface IProperties {
  habitat?: Habitat;
  application?: TestApplication;
  cycle?: TestCycle;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const Form = ({ habitat, application, cycle }: IProperties) => {
  const [reviewMode, setReviewMode] = useState(false);

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const { data: formAnswers }: { data: FormAnswer[] } = useFormAnswersQuery({
    criteria: (c1: RecursiveModelPredicate<LazyFormAnswer>) =>
      c1.testapplicationID.eq(application?.id || ''),
    dependencyArray: [application, reviewMode],
    paginationProducer: undefined,
  });

  const navigate = useNavigate();

  const { data: form } = useFormById({
    id: cycle?.form || '',
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
      <div className={`${style.formContainer}`}>
        {reviewMode ||
        application?.submissionStatus === SubmissionStatus.COMPLETED ? (
          <>
            <FormioForm
              key="review"
              src={`${FORMIO_URL}/${form.url}`}
              options={
                {
                  readOnly: true,
                  renderMode: 'flat',
                  additional: {
                    application,
                    habitat,
                    openCycle: cycle,
                  },
                } as Options
              }
              submission={generateSubmission(formAnswers)}
            />
            <Modal
              title="Alert"
              width={{ base: '95%', medium: '30rem' }}
              open={showSubmitModal}
              onClickClose={handleOnClickSubmitModalClose}
            >
              <Text>
                Are you sure you want to submit your application? Once submited
                you won't be able to resubmit.
              </Text>
              <br />
              <Flex width="100%" justifyContent="end">
                <Button variation="primary" onClick={handleOnSubmit}>
                  Accept
                </Button>
                <Button onClick={handleOnClickSubmitModalClose}>Cancel</Button>
              </Flex>
            </Modal>
            <Flex justifyContent="space-between">
              {application?.submissionStatus !== SubmissionStatus.COMPLETED ? (
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
          </>
        ) : (
          <FormioForm
            key="real"
            src={`${FORMIO_URL}/${form.url}`}
            onSubmit={handleOnReview}
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
        )}
      </div>
    )
  );
};

export default Form;
