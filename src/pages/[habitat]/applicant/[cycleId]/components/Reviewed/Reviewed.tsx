import { useTranslation } from 'react-i18next';
import { MdOutlineNoteAlt, MdOutlineLibraryAddCheck } from 'react-icons/md';
import LocalNavigation from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]/components/LocalNavigation';

import Form from '../Form/Form';
import Decisions from './components/Decisions';
import style from './Reviewed.module.css';

import ReviewedProps from './Reviewed.types';

const Reviewed = ({
  habitat,
  cycle,
  application,
  activeTab,
  setActiveTab,
}: ReviewedProps) => {
  const { t } = useTranslation();
  const items = [
    {
      label: t('pages.habitat.applicant.cycle.application'),
      icon: <MdOutlineNoteAlt />,
    },
    {
      label: t('pages.habitat.applicant.cycle.decisions'),
      icon: <MdOutlineLibraryAddCheck />,
    },
  ];

  const Tab = {
    0: <Form habitat={habitat} application={application} cycle={cycle} />,
    1: <Decisions application={application} />,
  }[activeTab];

  return (
    <div className={style.detailsContainer}>
      <LocalNavigation
        items={items}
        current={activeTab}
        onChange={(newCurrent) => setActiveTab(newCurrent)}
      />
      <div className={style.tabContainer}>{Tab}</div>
    </div>
  );
};

export default Reviewed;
