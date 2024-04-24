import React, { useCallback } from 'react';
import { View, Heading, Flex, Button } from '@aws-amplify/ui-react';
import {
  ApplicationTypes,
  Habitat,
  SubmissionStatus,
  TestApplication,
} from 'models';
import { Form } from '@formio/react';
import { generateSubmission } from 'utils/formio';
import useAsync from 'hooks/utils/useAsync/useAsync';
import GeneralInfoTable from './components/GeneralInfoTable';
import PaperApplicationTable from './components/PaperApplicationTable';
import DecideModal from './components/DecideModal';
import ReturnModal from './components/ReturnModal';
import Metrics, { MetricsProps } from '../Metrics/Metrics';

interface IProperties {
  application?: TestApplication;
  handleReturnOnClick: () => void;
  handleDecideOnClick: () => void;
  returnModalOpen: boolean;
  handleReturnModalOnClose: () => void;
  handleOnValidReturn: () => void;
  decideModalOpen: boolean;
  handleDecideModalOnClose: () => void;
  handleOnValidDecide: () => void;
  loading: number;
  habitat?: Habitat;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const ApplicationTab = ({
  application,
  returnModalOpen,
  handleReturnModalOnClose,
  handleOnValidReturn,
  decideModalOpen,
  handleDecideModalOnClose,
  handleOnValidDecide,
  handleReturnOnClick,
  handleDecideOnClick,
  loading,
  habitat,
}: IProperties) => {
  const asyncFunction = useCallback(async () => {
    if (application) {
      return application.FormAnswers.toArray();
    }
  }, [application]);

  const { value: formAnswers } = useAsync({
    asyncFunction,
  });

  const fields: { [key: string]: MetricsProps['data'] } = {};
  formAnswers
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ?.map((answer) => JSON.parse(answer.values!))
    .forEach((obj) => {
      for (const key in obj) {
        fields[key] = obj[key];
      }
    });

  return (
    <>
      <View marginTop="2rem" marginBottom="2rem">
        <Heading level={1} fontWeight="medium">
          {application?.type === ApplicationTypes.PAPER &&
            application.props &&
            JSON.parse(application.props).name}
        </Heading>
        <Heading level={1} fontWeight="medium">
          Application
        </Heading>
      </View>

      <GeneralInfoTable
        reviewStatus={application?.reviewStatus}
        submissionStatus={application?.submissionStatus}
        submittedDate={application?.submittedDate}
      />
      <br />
      {formAnswers && (
        <Form
          src={`${FORMIO_URL}/loudoun`}
          options={{
            readOnly: true,
            renderMode: 'flat',
          }}
          submission={generateSubmission(formAnswers)}
        />
      )}
      <Metrics data={fields.metrics} />

      {application?.type === ApplicationTypes.PAPER ? (
        <PaperApplicationTable application={application} />
      ) : (
        application &&
        application?.submissionStatus === SubmissionStatus.SUBMITTED && (
          <>
            <br />
            <Flex justifyContent="end">
              <ReturnModal
                open={returnModalOpen}
                onClose={handleReturnModalOnClose}
                onValidReturn={handleOnValidReturn}
                loading={loading}
              />
              <DecideModal
                open={decideModalOpen}
                onClose={handleDecideModalOnClose}
                onValid={handleOnValidDecide}
                loading={loading}
                customStatus={habitat?.props.customStatus}
              />
              <Button onClick={handleReturnOnClick}>Return</Button>
              <Button variation="primary" onClick={handleDecideOnClick}>
                Decide
              </Button>
            </Flex>
          </>
        )
      )}
    </>
  );
};

export default ApplicationTab;
