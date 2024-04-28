/**
 * This constant is used to store the routes and their titles
 * Things to consider: dynamic parths should start with a colon,
 * this way the getRouteTitle function can replace the dynamic part with the route part
 */

export const ROUTES = {
  applicantApplications: {
    title: 'Applications',
    route: '/:habitat/applicant/applications',
  },
  affiliateHome: {
    title: 'Home',
    route: '/:habitat/affiliate/home',
  },
  affiliateForms: {
    title: 'Forms',
    route: '/:habitat/affiliate/forms',
  },
  affiliateCycles: {
    title: 'Cycles',
    route: '/:habitat/affiliate/:formid',
  },
  affiliateApplications: {
    title: 'Applications',
    route: '/:habitat/affiliate/:formid/:cycleid',
  },
  affiliateApplicationDetail: {
    title: 'Application',
    route: '/:habitat/affiliate/:formid/:cycleid/:applicationid',
  },
  affiliateAnalytics: {
    title: 'Analytics',
    route: '/:habitat/affiliate/analytics',
  },
  affiliateUsers: {
    title: 'Users',
    route: '/:habitat/affiliate/users',
  },
};

export const getRouteTitle = (route: string) => {
  const title = Object.entries(ROUTES).find(([, value]) => {
    const routeArray = value.route.split('/');
    const realRouteArray = route.split('/');
    for (let i = 0; i < routeArray.length; i += 1) {
      if (routeArray[i].startsWith(':')) {
        realRouteArray[i] = routeArray[i];
      }
    }
    return routeArray.join('/') === realRouteArray.join('/');
  });

  return title ? title[1].title : undefined;
};
