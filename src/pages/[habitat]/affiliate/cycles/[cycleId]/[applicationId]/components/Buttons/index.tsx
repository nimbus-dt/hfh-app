import { Flex } from '@aws-amplify/ui-react';
import {
  ApplicationTypes,
  SubmissionStatus,
  type TestApplication,
} from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import ReturnModal from './components/ReturnModal';
import DecideModal from './components/DecideModal';
import {
  TDecideSchema,
  TReturnSchema,
} from '../../AffiliateApplicationDetailsPage.schema';

interface ButtonsProps {
  application?: TestApplication;
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

const Buttons = ({
  loading,
  application,
  returnModalOpen,
  handleReturnModalOnClose,
  handleOnValidReturn,
  decideModalOpen,
  handleDecideModalOnClose,
  handleOnValidDecide,
  handleReturnOnClick,
  handleDecideOnClick,
}: ButtonsProps) => {
  if (!application) return null;
  if (application?.type === ApplicationTypes.PAPER) return null;
  if (!(application?.submissionStatus === SubmissionStatus.COMPLETED))
    return null;

  return (
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
  );
};

export default Buttons;
