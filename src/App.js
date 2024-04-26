import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';

import CyclesPage from 'pages/affiliate-portal/cycles';
import ApplicationsPage from 'pages/affiliate-portal/cycles/[cycleId]';
import ApplicationDetailsPage from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]';
import AffiliatePortalHomePage from 'pages/affiliate-portal/home';
import AffiliatePortalRepairsPage from 'pages/affiliate-portal/repairs';
import AffiliatePortalVolunteersPage from 'pages/affiliate-portal/volunteers';
import AffiliatePortalSettingsPage from 'pages/affiliate-portal/settings';

import { NewLandingLayout } from 'pages/index/Layout/NewLandingLayout';
import LandingPage from 'pages/index/LandingPage';
import TermsPage from 'pages/terms/TermsPage';
import PrivacyPage from 'pages/privacy';
import ContactPage from 'pages/contact';
import DataPage from 'pages/data';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import HomeownershipHomePage from 'pages/homeownership/[habitat]/home';
import HomeownershipReviewPage from 'pages/homeownership/[habitat]/review';
import HabitatLayout from 'layouts/HabitatLayout';
import AffiliateLayout from 'layouts/AffiliateLayout';
import ApplicantLayout from 'layouts/ApplicantLayout';
import { ROUTES } from 'utils/constants';
// import ApplicantLayout from 'pages/[habitat]/applicant/layout';
import ApplicantApplicationsPage from 'pages/[habitat]/applicant/applications';
import ApplicantDecisionsPage from 'pages/[habitat]/applicant/decisions/ApplicantDecisionsPage';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ScrollView height="100vh" width="100%">
            <Outlet />
          </ScrollView>
        }
      >
        <Route
          index
          element={
            <NewLandingLayout>
              <LandingPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="privacy"
          element={
            <NewLandingLayout>
              <PrivacyPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="data"
          element={
            <NewLandingLayout>
              <DataPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="terms"
          element={
            <NewLandingLayout>
              <TermsPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="contact"
          element={
            <NewLandingLayout>
              <ContactPage />
            </NewLandingLayout>
          }
        />
      </Route>

      <Route path={ROUTES.HABITAT} element={<HabitatLayout />}>
        <Route path={ROUTES.HABITAT_APPLICANT} element={<ApplicantLayout />}>
          <Route
            path={ROUTES.HABITAT_APPLICANT_FORM}
            element={<HomeownershipHomePage />}
          />
          <Route
            path={ROUTES.HABITAT_APPLICANT_REVIEW}
            element={<HomeownershipReviewPage />}
          />
        </Route>
        <Route path={ROUTES.HABITAT_AFFILIATE} element={<AffiliateLayout />}>
          <Route
            path={ROUTES.HABITAT_AFFILIATE_HOME}
            element={<AffiliatePortalHomePage />}
          />
          <Route path={ROUTES.HABITAT_AFFILIATE_CYCLES}>
            <Route index element={<CyclesPage />} />
            <Route path={ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE}>
              <Route index element={<ApplicationsPage />} />
              <Route
                path={ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE_APPLICATION}
                element={<ApplicationDetailsPage />}
              />
            </Route>
          </Route>
          <Route
            path={ROUTES.HABITAT_AFFILIATE_REPAIRS}
            element={<AffiliatePortalRepairsPage />}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_VOLUNTEERS}
            element={<AffiliatePortalVolunteersPage />}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_SETTINGS}
            element={<AffiliatePortalSettingsPage />}
          />
        </Route>
      </Route>

      <Route path=":habitat">
        <Route path="applicant" element={<ApplicantLayout />}>
          <Route path="applications" element={<ApplicantApplicationsPage />} />
          <Route path="decisions" element={<ApplicantDecisionsPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
