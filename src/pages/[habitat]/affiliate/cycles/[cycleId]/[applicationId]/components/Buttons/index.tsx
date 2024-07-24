import { Flex } from '@aws-amplify/ui-react';
import {
  ApplicationTypes,
  SubmissionStatus,
  type TestApplication,
} from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import { MdOutlineMail, MdOutlinePrint } from 'react-icons/md';
import DecideModal from './components/DecideModal';
import { TDecideSchema } from '../../AffiliateApplicationDetailsPage.schema';

interface ButtonsProps {
  application?: TestApplication;
  decideModalOpen: boolean;
  handleDecideModalOnClose: () => void;
  handleOnValidDecide: (data: TDecideSchema) => void;
  handleDecideOnClick: () => void;
  loading: number;
}

const Buttons = ({
  loading,
  application,
  decideModalOpen,
  handleDecideModalOnClose,
  handleOnValidDecide,
  handleDecideOnClick,
}: ButtonsProps) => {
  if (!application) return null;
  if (application?.type === ApplicationTypes.PAPER) return null;
  if (!(application?.submissionStatus === SubmissionStatus.COMPLETED))
    return null;

  return (
    <Flex justifyContent="end">
      <DecideModal
        open={decideModalOpen}
        onClose={handleDecideModalOnClose}
        onValid={handleOnValidDecide}
        loading={loading}
      />
      <CustomButton icon={<MdOutlinePrint />} variation="primary">
        Print
      </CustomButton>
      <CustomButton
        onClick={handleDecideOnClick}
        icon={<MdOutlineMail />}
        variation="primary"
      >
        Send Decision
      </CustomButton>
    </Flex>
  );
};

export default Buttons;
