import { useTranslation } from 'react-i18next';

const useRoutes = () => {
  const { t } = useTranslation();
  return {
    applicantApplications: {
      title: t('routes.applicantApplications'),
      route: '/:habitat/applicant/applications',
    },
    applicantDecisions: {
      title: t('routes.applicantDecisions'),
      route: '/:habitat/applicant/decisions',
    },
    applicantForm: {
      title: t('routes.applicantForm'),
      route: '/:habitat/applicant/:cycleId',
    },
    affiliateHome: {
      title: t('routes.affiliateHome'),
      route: '/:habitat/affiliate/home',
    },
    affiliateForms: {
      title: t('routes.affiliateForms'),
      route: '/:habitat/affiliate/forms',
    },
    affiliateCycles: {
      title: t('routes.affiliateCycles'),
      route: '/:habitat/affiliate/:formid',
    },
    affiliateApplications: {
      title: t('routes.affiliateApplications'),
      route: '/:habitat/affiliate/:formid/:cycleid',
    },
    affiliateApplicationDetail: {
      title: t('routes.affiliateApplicationDetail'),
      route: '/:habitat/affiliate/:formid/:cycleid/:applicationid',
    },
    affiliateAnalytics: {
      title: t('routes.affiliateAnalytics'),
      route: '/:habitat/affiliate/analytics',
    },
    affiliateUsers: {
      title: t('routes.affiliateUsers'),
      route: '/:habitat/affiliate/users',
    },
    settings: {
      title: t('routes.settings'),
    },
  };
};

export default useRoutes;
