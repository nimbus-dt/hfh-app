import { Flex, Loader } from '@aws-amplify/ui-react';
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
  handleDownloadApplicationOnClick: () => void;
  loading: number;
  downloading: boolean;
}

const Buttons = ({
  loading,
  application,
  decideModalOpen,
  handleDecideModalOnClose,
  handleOnValidDecide,
  handleDecideOnClick,
  handleDownloadApplicationOnClick,
  downloading,
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
      <CustomButton
        variation="primary"
        title="Download application"
        onClick={handleDownloadApplicationOnClick}
        disabled={downloading}
      >
        <Flex justifyContent="center" alignContent="center">
          {downloading ? (
            <Loader size="large" />
          ) : (
            <MdOutlinePrint size="24px" />
          )}
        </Flex>
      </CustomButton>
      <CustomButton
        variation="primary"
        onClick={handleDecideOnClick}
        title="Make a decision"
      >
        <MdOutlineMail size="24px" />
      </CustomButton>
    </Flex>
  );
};

export default Buttons;
