import Modal from 'components/Modal';
import { useMemo } from 'react';
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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  const status = watch('status');

  const placeholder = useMemo(() => {
    const returnPlaceholder = `${t(
      'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.1'
    )}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.2'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.3'
)}
${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.4'
)}
${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.5'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.6'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.7'
)}
${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.return.8'
)}
`;

    const acceptPlaceholder = `${t(
      'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.1'
    )}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.2'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.3'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.4'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.5'
)}
${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.accept.6'
)}
`;

    const rejectedPlaceholder = `${t(
      'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.1'
    )}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.2'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.3'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.4'
)}

${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.5'
)}
${t(
  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.placeholders.reject.6'
)}
`;

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
          {t(
            'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.description'
          )}
        </Text>
        <br />
        <SelectField
          {...registerDecide('status')}
          label={t(
            'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.status.label'
          )}
          hasError={errorsDecide?.status}
          errorMessage={t(
            'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.status.error'
          )}
        >
          <option value={ReviewStatus.RETURNED}>
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.status.return'
            )}
          </option>
          <option value={ReviewStatus.ACCEPTED}>
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.status.accept'
            )}
          </option>
          <option value={ReviewStatus.DENIED}>
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.status.deny'
            )}
          </option>
        </SelectField>
        <br />
        {status === ReviewStatus.RETURNED && (
          <>
            <Text>
              {t(
                'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.warning'
              )}
            </Text>
            <br />
          </>
        )}
        <Text>
          {t(
            'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.message'
          )}
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
              <Text>
                {' '}
                {t(
                  'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.sending'
                )}
              </Text>
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
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.cancel'
            )}
          </Button>
          <Button type="submit" isDisabled={loading > 0}>
            {t(
              'pages.habitat.affiliate.cycles.cycle.application.components.buttons.components.decideModal.send'
            )}
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
