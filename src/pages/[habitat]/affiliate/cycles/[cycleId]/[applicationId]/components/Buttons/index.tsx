import { Flex } from '@aws-amplify/ui-react';
import {
  ApplicationTypes,
  SubmissionStatus,
  type TestApplication,
} from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import { MdOutlineMail, MdOutlinePrint } from 'react-icons/md';
import { printElement } from 'utils/print';
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

  const handlePrintOnClick = () => {
    const formioForm = document.querySelector(
      '#application-tab'
    ) as HTMLElement;

    printElement(formioForm);
  };

  return (
    <Flex justifyContent="end">
      <DecideModal
        open={decideModalOpen}
        onClose={handleDecideModalOnClose}
        onValid={handleOnValidDecide}
        loading={loading}
      />
      <CustomButton variation="primary" onClick={handlePrintOnClick}>
        <MdOutlinePrint size="24px" />
      </CustomButton>
      <CustomButton variation="primary" onClick={handleDecideOnClick}>
        <MdOutlineMail size="24px" />
      </CustomButton>
    </Flex>
  );
};

export default Buttons;
