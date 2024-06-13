import Modal from 'components/Modal';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Flex,
  Loader,
  SelectField,
  Text,
  View,
} from '@aws-amplify/ui-react';
import LexicalEditor from 'components/LexicalEditor';
import { ReviewStatus } from 'models';
import { decideSchema } from '../../../../AffiliateApplicationDetailsPage.schema';

const DecideModal = ({ open, onClose, onValid, loading }) => {
  const {
    control,
    register: registerDecide,
    handleSubmit: handleSubmitDecide,
    formState: { errors: errorsDecide },
    watch,
  } = useForm({
    resolver: zodResolver(decideSchema),
    shouldUnregister: true,
    shouldFocusError: true,
  });

  const status = watch('status');

  const placeholder = useMemo(() => {
    const returnPlaceholder = `Dear John Doe,

Thank you for taking the time to complete your application. After a thorough review, we are excited to continue the application process with you. However, we need you to revise the following sections of your application:

Income: Please include consecutive pay stubs for the last 60 days. Currently, you have only included pay stubs for the last 30 days.
U.S. Citizenship: Please provide correct proof of legal residence. The file you submitted does not verify your residency status.
Once you have made the necessary revisions, please resubmit your application for further review.

Thank you for your cooperation.

Best regards,
The Habitat for Humanity Team
    `;

    const acceptPlaceholder = `Dear John Doe,

Thank you for completing your application. We are pleased to inform you that your application has been accepted.

We will be in touch soon with the next steps in the process. If you have any questions or need further assistance, please do not hesitate to contact us.

Welcome to the Habitat for Humanity community!

Best regards,
The Habitat for Humanity Team`;

    const rejectedPlaceholder = `Dear John Doe,

Thank you for your interest in Habitat for Humanity and for taking the time to complete your application. After a thorough review, we regret to inform you that we are unable to proceed with your application at this time.

We understand this may be disappointing news. Please feel free to contact us if you have any questions or if you would like feedback on your application.

Thank you for your understanding and support of our mission.

Best regards,
The Habitat for Humanity Team`;

    switch (status) {
      case ReviewStatus.RETURNED: {
        return returnPlaceholder;
      }

      case ReviewStatus.ACCEPTED: {
        return acceptPlaceholder;
      }

      case ReviewStatus.DENIED: {
        return rejectedPlaceholder;
      }

      default: {
        return '';
      }
    }
  }, [status]);

  return (
    <Modal title="Decide" open={open} onClickClose={onClose} width="45rem">
      <form onSubmit={handleSubmitDecide(onValid)}>
        <Text>
          When you make a decision, we notify applicants via email and store the
          decision in the application's Decision tab.
        </Text>
        <br />
        <SelectField
          {...registerDecide('status')}
          label="Status"
          hasError={errorsDecide?.status}
          errorMessage="Invalid status"
        >
          <option value={ReviewStatus.ACCEPTED}>Accepted</option>
          <option value={ReviewStatus.DENIED}>Denied</option>
          <option value={ReviewStatus.RETURNED}>Returned</option>
        </SelectField>
        <br />
        {status === ReviewStatus.RETURNED && (
          <>
            <Text>
              By returning an application, you are allowing an applicant to
              enter their application and fix mistakes. Once they have fixed
              them, they can submit the application.
            </Text>
            <br />
          </>
        )}
        <Text>
          Include here the decision message you want to send to the applicant.
          You can attach files, links and images.
        </Text>
        <br />
        <Controller
          control={control}
          name="message"
          defaultValue={{}}
          render={({ field: { onChange } }) => (
            <LexicalEditor
              onChange={(editorState) => onChange(editorState.toJSON())}
              editable
              placeholder={placeholder}
            />
          )}
        />
        {loading > 0 && (
          <>
            <br />
            <View>
              <Text>Updating application and sending email to applicant.</Text>
              <Loader variation="linear" />
            </View>
          </>
        )}
        <Flex justifyContent="end" marginTop="1rem">
          <Button
            variation="destructive"
            onClick={onClose}
            isDisabled={loading > 0}
          >
            Cancel
          </Button>
          <Button type="submit" isDisabled={loading > 0}>
            Send
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

DecideModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValid: PropTypes.func,
  loading: PropTypes.number,
  customStatus: PropTypes.array,
};

export default DecideModal;
