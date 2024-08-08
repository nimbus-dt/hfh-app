import { createBrowserRouter } from 'react-router-dom';
import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';
import Landing from 'pages/landing';
import { ROUTES } from 'utils/constants';
import HabitatLayout from 'layouts/HabitatLayout';
import ApplicantLayout from 'layouts/ApplicantLayout';
import ApplicantApplicationsPage from 'pages/[habitat]/applicant/applications';
import ApplicantDecisionsPage from 'pages/[habitat]/applicant/decisions/ApplicantDecisionsPage';
import ApplicantCyclePage from 'pages/[habitat]/applicant/[cycleId]';
import AffiliateLayout from 'layouts/AffiliateLayout';
import AffiliateFormsPage from 'pages/[habitat]/affiliate/forms';
import AffiliateHomePage from 'pages/[habitat]/affiliate/home';
import AffiliateAnalyticsPage from 'pages/[habitat]/affiliate/analytics';
import AffiliateUsersPage from 'pages/[habitat]/affiliate/users';
import CyclesPage from 'pages/[habitat]/affiliate/cycles';
import AffiliateCycleApplications from 'pages/[habitat]/affiliate/cycles/[cycleId]/AffiliateCycleApplications';
import AffiliateApplicationDetailsPage from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]';
import MaintenancePage from 'pages/maintenance/Maintenance';
import Print from 'pages/print/page';
import HabitatError from 'pages/[habitat]/HabitatError';
import RootFormError from 'pages/[habitat]/affiliate/cycles/page.error';
import habitatLoader from './loaders/habitat';
import rootFormLoader from './loaders/rootForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <CheckMaintenance>
        <div style={{ height: 'auto', minHeight: '100vh', width: '100%' }}>
          <Landing />
        </div>
      </CheckMaintenance>
    ),
  },
  {
    path: ROUTES.HABITAT,
    element: <HabitatLayout />,
    loader: habitatLoader,
    errorElement: <HabitatError />,
    children: [
      {
        path: ROUTES.HABITAT_APPLICANT,
        element: <ApplicantLayout />,
        children: [
          {
            path: ROUTES.HABITAT_APPLICANT_APPLICATIONS,
            element: <ApplicantApplicationsPage />,
          },
          {
            path: ROUTES.HABITAT_APPLICANT_DECISIONS,
            element: <ApplicantDecisionsPage />,
          },
          {
            path: ROUTES.HABITAT_APPLICANT_CYCLE,
            element: <ApplicantCyclePage />,
          },
        ],
      },
      {
        path: ROUTES.HABITAT_AFFILIATE,
        element: <AffiliateLayout />,
        children: [
          {
            path: ROUTES.HABITAT_AFFILIATE_HOME,
            element: <AffiliateHomePage />,
          },
          {
            path: ROUTES.HABITAT_AFFILIATE_FORMS,
            element: <AffiliateFormsPage />,
          },
          {
            path: ROUTES.HABITAT_AFFILIATE_ANALYTICS,
            element: <AffiliateAnalyticsPage />,
          },
          {
            path: ROUTES.HABITAT_AFFILIATE_USERS,
            element: <AffiliateUsersPage />,
          },
          {
            path: ':formId',
            loader: rootFormLoader,
            errorElement: <RootFormError />,
            id: 'rootForm',
            children: [
              {
                index: true,
                element: <CyclesPage />,
              },
              {
                path: ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE,
                children: [
                  {
                    index: true,
                    element: <AffiliateCycleApplications />,
                  },
                  {
                    path: ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE_APPLICATION,
                    element: <AffiliateApplicationDetailsPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: ROUTES.maintenance,
    element: <MaintenancePage />,
  },
  {
    path: ROUTES.PRINT,
    element: <Print />,
  },
]);

export default router;
