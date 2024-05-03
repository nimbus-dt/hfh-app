import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ScrollView } from '@aws-amplify/ui-react';
import ApplicationsPage from 'pages/affiliate-portal/cycles/[cycleId]';
import ApplicationDetailsPage from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]';
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
import ApplicantCyclePage from 'pages/[habitat]/applicant/[cycleId]';
import HomeownershipReviewPage from 'pages/homeownership/[habitat]/review';
import HabitatLayout from 'layouts/HabitatLayout';
import ApplicantLayout from 'layouts/ApplicantLayout';
import { ROUTES } from 'utils/constants';
import ApplicantApplicationsPage from 'pages/[habitat]/applicant/applications';
import ApplicantDecisionsPage from 'pages/[habitat]/applicant/decisions/ApplicantDecisionsPage';
import AffiliateFormsPage from 'pages/[habitat]/affiliate/forms';
import CyclesPage from 'pages/[habitat]/affiliate/cycles';
import NewAffiliateLayout from 'layouts/NewAffiliateLayout';
import AffiliateCycleApplications from 'pages/[habitat]/affiliate/cycles/[cycleId]/AffiliateCycleApplications';

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
            path={ROUTES.HABITAT_APPLICANT_REVIEW}
            element={<HomeownershipReviewPage />}
          />
          <Route
            path={ROUTES.HABITAT_APPLICANT_APPLICATIONS}
            element={<ApplicantApplicationsPage />}
          />
          <Route
            path={ROUTES.HABITAT_APPLICANT_DECISIONS}
            element={<ApplicantDecisionsPage />}
          />
          <Route
            path={ROUTES.HABITAT_APPLICANT_CYCLE}
            element={<ApplicantCyclePage />}
          />
        </Route>
        <Route path={ROUTES.HABITAT_AFFILIATE} element={<NewAffiliateLayout />}>
          <Route path={ROUTES.HABITAT_AFFILIATE_HOME} element={<h1>Home</h1>} />
          <Route path={ROUTES.HABITAT_AFFILIATE_CYCLES}>
            <Route index element={<CyclesPage />} />
            <Route path={ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE}>
              <Route index element={<AffiliateCycleApplications />} />
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
          <Route
            path={ROUTES.HABITAT_AFFILIATE_FORMS}
            element={<AffiliateFormsPage />}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_ANALYTICS}
            element={<p>This page is under construction</p>}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_USERS}
            element={<p>This page is under construction</p>}
          />
          <Route path=":formId">
            <Route index element={<h1>Cycles Dashboard Page</h1>} />
            <Route path=":cycleId">
              <Route index element={<h1>Applications Dashboard Page</h1>} />
              <Route
                path=":applicationId"
                element={<h1>Application Detail</h1>}
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="testing" element={<AffiliateFormsPage />} />

      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
