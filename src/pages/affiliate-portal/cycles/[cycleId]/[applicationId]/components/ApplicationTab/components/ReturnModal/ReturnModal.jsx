import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from 'components/Modal';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Button, Flex, Loader, Text, View } from '@aws-amplify/ui-react';
import LexicalEditor from 'components/LexicalEditor';
import { returnSchema } from '../../../../ApplicationDetailsPage.schema';

const ReturnModal = ({ open, onClose, onValidReturn, loading }) => {
  const { control, handleSubmit: handleSubmitReturn } = useForm({
    resolver: zodResolver(returnSchema),
    shouldUnregister: true,
    shouldFocusError: false,
  });

  return (
    <Modal title="Return" open={open} onClickClose={onClose} width="45rem">
      <form onSubmit={handleSubmitReturn(onValidReturn)}>
        <Text>
          By returning an application you are giving an applicant the chance to
          edit their info.
        </Text>
        <br />
        <Text>
          Please complete a return message below. Make sure to include all the
          information an applicant needs to go back and review their
          application. You can include specific pictures of what they need to
          change.
        </Text>
        <br />
        <Controller
          control={control}
          name="message"
          defaultValue=""
          render={({ field: { onChange } }) => (
            <LexicalEditor
              onChange={(editorState) => onChange(editorState.toJSON())}
              editable
            />
          )}
        />
        <br />
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
            Return
          </Button>
        </Flex>
      </form>
    </Modal>
  );
};

ReturnModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onValidReturn: PropTypes.func,
  loading: PropTypes.number,
};

export default ReturnModal;
