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
  applicantDecisions: {
    title: 'Decisions',
    route: '/:habitat/applicant/decisions',
  },
};

/**
 * Get the title of the route based on the ROUTES constant
 * @param route
 * @returns
 */

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

/**
 * Check if the current route is active comparing the current route with the route from a item in ROUTES constant
 * @param currentRoute
 * @param routeToCompare
 * @returns
 */

export const isCurrentRouteActive = (
  currentRoute: string,
  routeToCompare: string
) => {
  const routeArray = routeToCompare.split('/');
  const realRouteArray = currentRoute.split('/');
  for (let i = 0; i < routeArray.length; i += 1) {
    if (routeArray[i].startsWith(':')) {
      realRouteArray[i] = routeArray[i];
    }
  }
  return routeArray.join('/') === realRouteArray.join('/');
};
