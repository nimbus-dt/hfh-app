import { Flex, Loader } from '@aws-amplify/ui-react';
import {
  ApplicationTypes,
  SubmissionStatus,
  type TestApplication,
} from 'models';
import CustomButton from 'components/CustomButton/CustomButton';
import { MdOutlineMail, MdOutlinePrint } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        title={t(
          'pages.habitat.affiliate.cycles.cycle.application.components.buttons.download'
        )}
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
        title={t(
          'pages.habitat.affiliate.cycles.cycle.application.components.buttons.decide'
        )}
      >
        <MdOutlineMail size="24px" />
      </CustomButton>
    </Flex>
  );
};

export default Buttons;
