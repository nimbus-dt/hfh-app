import { TFunction } from 'i18next';

interface useRoutesProps {
  [key: string]: { title: string; route?: string };
}

const routes = (t: TFunction<'translation', undefined>): useRoutesProps => ({
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
});

export const isActive = (pathname: string, route = '') => {
  const pathnameArray = pathname.split('/');
  const routeArray = route.split('/');
  return pathnameArray.every((path, index) => {
    if (routeArray[index] === ':habitat') return true;
    return path === routeArray[index];
  });
};

export const getTitle = (route: string, ROUTES: useRoutesProps) => {
  const title = Object.entries(ROUTES).find(([, value]) => {
    if (!value.route) return false;
    const routeArray = value.route.split('/');
    const realRouteArray = route.split('/');
    for (let i = 0; i < routeArray.length; i += 1) {
      if (routeArray[i].startsWith(':')) {
        realRouteArray[i] = routeArray[i];
      }
    }
    return realRouteArray.join('/') === routeArray.join('/');
  });
  return title ? title[1].title : '';
};

export { type useRoutesProps };

export default routes;
