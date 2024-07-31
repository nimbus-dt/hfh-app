import CustomButton from 'components/CustomButton';
import { useTranslation } from 'react-i18next';
import { MdOutlineAdd, MdOutlineClear } from 'react-icons/md';

interface ICycleButton {
  isSmall: boolean;
  isACycleOpen: boolean;
  onClick: () => void;
}

const CycleButton = ({ isSmall, isACycleOpen, onClick }: ICycleButton) => {
  const { t } = useTranslation();

  const text = isACycleOpen
    ? t('pages.habitat.affiliate.cycles.button.closeCycle')
    : t('pages.habitat.affiliate.cycles.button.newCycle');

  const icon = isACycleOpen ? (
    <MdOutlineClear size="24px" />
  ) : (
    <MdOutlineAdd size="24px" />
  );

  return (
    <CustomButton
      variation="primary"
      icon={!isSmall ? icon : undefined}
      onClick={onClick}
    >
      {isSmall ? icon : text}
    </CustomButton>
  );
};

export default CycleButton;
