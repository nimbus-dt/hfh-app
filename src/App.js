import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';

import AffiliateLayout from 'pages/affiliate-portal/AffiliateLayout';
import CyclesPage from 'pages/affiliate-portal/cycles';
import TestApplications from 'pages/affiliate-portal/cycles/[cycleId]';
import TestApplicationDetails from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]';
import AffiliatePortalHomePage from 'pages/affiliate-portal/home';
import AffiliatePortalRepairsPage from 'pages/affiliate-portal/repairs';
import AffiliatePortalVolunteersPage from 'pages/affiliate-portal/volunteers';
import AffiliatePortalSettingsPage from 'pages/affiliate-portal/settings';

import { NewLandingLayout } from 'pages/index/Layout/NewLandingLayout';
import LandingPage from 'pages/index/LandingPage';
import TermsPage from 'pages/terms/TermsPage';
import PrivacyPage from 'pages/privacy';
import ContactPage from 'pages/contact';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import HomeownershipLayout from 'pages/homeownership/HomeownershipLayout';
import HomeownershipHomePage from 'pages/homeownership/[habitat]/home';
import HomeownershipTermsPage from 'pages/homeownership/[habitat]/terms';
import HomeownershipApplicantInfoPage from 'pages/homeownership/[habitat]/applicant-info';
import HomeownershipApplicantOptionalPage from 'pages/homeownership/[habitat]/applicant-optional';
import HomeownershipChecklistPage from 'pages/homeownership/[habitat]/checklist';
import HomeownershipWrittenPage from 'pages/homeownership/[habitat]/written';
import HomeownershipRecordsPage from 'pages/homeownership/[habitat]/records';
import HomeownershipHomeownersPage from 'pages/homeownership/[habitat]/homeowners';
import HomeownershipEmploymentPage from 'pages/homeownership/[habitat]/employment';
import HomeownershipFinancialPage from 'pages/homeownership/[habitat]/financial';
import HomeownershipReviewPage from 'pages/homeownership/[habitat]/review';
import { LandingLayout } from './components/Landing/LandingLayout';
import { LandingAbout } from './components/Landing/LandingAbout';
import { LandingReturn } from './components/Landing/LandingReturn';
import { LandingNewPricing } from './components/Landing/LandingNewPricing';

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
          path="about"
          element={<LandingLayout comp={<LandingAbout />} />}
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
          path="terms"
          element={
            <NewLandingLayout>
              <TermsPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="return"
          element={<LandingLayout comp={<LandingReturn />} />}
        />
        <Route
          path="contact"
          element={
            <NewLandingLayout>
              <ContactPage />
            </NewLandingLayout>
          }
        />
        <Route
          path="pricing"
          element={<LandingLayout comp={<LandingNewPricing />} />}
        />
      </Route>

      <Route
        path="homeownership"
        element={
          <Authenticator.Provider>
            <HomeownershipLayout />
          </Authenticator.Provider>
        }
      >
        <Route path=":habitat">
          <Route path="home" element={<HomeownershipHomePage />} />
          <Route path="terms" element={<HomeownershipTermsPage />} />
          <Route
            path="applicant-info"
            element={<HomeownershipApplicantInfoPage />}
          />
          <Route
            path="applicant-optional"
            element={<HomeownershipApplicantOptionalPage />}
          />
          <Route path="checklist" element={<HomeownershipChecklistPage />} />
          <Route path="written" element={<HomeownershipWrittenPage />} />
          <Route path="records" element={<HomeownershipRecordsPage />} />
          <Route path="homeowners" element={<HomeownershipHomeownersPage />} />
          <Route path="employment" element={<HomeownershipEmploymentPage />} />
          <Route path="financial" element={<HomeownershipFinancialPage />} />
          <Route path="review" element={<HomeownershipReviewPage />} />
        </Route>
      </Route>

      <Route path="affiliate-portal">
        <Route
          path=":habitat"
          element={
            <Authenticator.Provider>
              <AffiliateLayout />
            </Authenticator.Provider>
          }
        >
          <Route path="home" element={<AffiliatePortalHomePage />} />
          <Route path="cycles">
            <Route index element={<CyclesPage />} />
            <Route path=":cycleId">
              <Route index element={<TestApplications />} />
              <Route
                path=":applicationId"
                element={<TestApplicationDetails />}
              />
            </Route>
          </Route>
          <Route path="applications">
            <Route index element={<TestApplications />} />
            <Route path=":applicationId" element={<TestApplicationDetails />} />
          </Route>
          <Route path="repairs" element={<AffiliatePortalRepairsPage />} />
          <Route
            path="volunteers"
            element={<AffiliatePortalVolunteersPage />}
          />
          <Route path="settings" element={<AffiliatePortalSettingsPage />} />
        </Route>
      </Route>

      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
