import { Flex } from '@aws-amplify/ui-react';
import { Form } from '@formio/react';
import CustomButton from 'components/CustomButton/CustomButton';
import {
  ApplicationTypes,
  SubmissionStatus,
  FormAnswer,
  TestApplication,
  Habitat,
} from 'models';

import React from 'react';
import { generateSubmission } from 'utils/formio';
import PaperApplicationTable from './components/PaperApplicationTable';
import ReturnModal from './components/ReturnModal';
import DecideModal from './components/DecideModal';
import {
  TDecideSchema,
  TReturnSchema,
} from '../../AffiliateApplicationDetailsPage.schema';

interface IProperties {
  application?: TestApplication;
  formAnswers: FormAnswer[];
  formUrl: string;
  returnModalOpen: boolean;
  handleReturnModalOnClose: () => void;
  handleOnValidReturn: (data: TReturnSchema) => void;
  decideModalOpen: boolean;
  handleDecideModalOnClose: () => void;
  handleOnValidDecide: (data: TDecideSchema) => void;
  handleReturnOnClick: () => void;
  handleDecideOnClick: () => void;
  loading: number;
}

const FORMIO_URL = process.env.REACT_APP_FORMIO_URL;

const ApplicationTab = ({
  application,
  formAnswers,
  formUrl,
  returnModalOpen,
  handleReturnModalOnClose,
  handleOnValidReturn,
  decideModalOpen,
  handleDecideModalOnClose,
  handleOnValidDecide,
  handleReturnOnClick,
  handleDecideOnClick,
  loading,
}: IProperties) => (
  <div className="container">
    <Form
      key="review"
      src={`${FORMIO_URL}/${formUrl}`}
      options={{
        readOnly: true,
        renderMode: 'flat',
      }}
      submission={generateSubmission(formAnswers)}
    />
    {application?.type === ApplicationTypes.PAPER ? (
      <PaperApplicationTable application={application} />
    ) : (
      application &&
      application?.submissionStatus === SubmissionStatus.COMPLETED && (
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
            />
            <CustomButton variation="secondary" onClick={handleReturnOnClick}>
              Return
            </CustomButton>
            <CustomButton variation="primary" onClick={handleDecideOnClick}>
              Decide
            </CustomButton>
          </Flex>
        </>
      )
    )}
  </div>
);

export default ApplicationTab;
