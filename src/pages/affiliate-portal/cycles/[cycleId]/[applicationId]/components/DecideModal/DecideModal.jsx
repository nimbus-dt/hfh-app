import Modal from 'components/Modal';
import React from 'react';
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
import { decideSchema } from '../../ApplicationDetailsPage.schema';

const DecideModal = ({ open, onClose, onValid, loading, customStatus }) => {
  const {
    control,
    register: registerDecide,
    handleSubmit: handleSubmitDecide,
    formState: { errors: errorsDecide },
  } = useForm({
    resolver: zodResolver(decideSchema),
    shouldUnregister: true,
    shouldFocusError: true,
  });

  return (
    <Modal title="Decide" open={open} onClickClose={onClose} width="30rem">
      <form onSubmit={handleSubmitDecide(onValid)}>
        <Text>Here is where you can render a decision for an application.</Text>
        <br />
        <SelectField
          {...registerDecide('status')}
          label="Status"
          hasError={errorsDecide?.status}
          errorMessage="Invalid status"
        >
          <option value="Pending">Pending</option>
          {(customStatus || []).map((customStatusItem) => (
            <option key={customStatusItem} value={customStatusItem}>
              {customStatusItem}
            </option>
          ))}
        </SelectField>
        <br />
        <Controller
          control={control}
          name="message"
          defaultValue={{}}
          render={({ field: { onChange } }) => (
            <LexicalEditor
              onChange={(editorState) => onChange(editorState.toJSON())}
              editable
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
