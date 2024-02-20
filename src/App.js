import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';
import { TestHome } from 'components/Test/Parts/TestHome';
import TestApplicantInfo from 'components/Test/Parts/TestApplicantInfo';
import TestApplicantOptional from 'components/Test/Parts/TestApplicantOptional';
import TestChecklist from 'components/Test/Parts/TestChecklist';
import TestWritten from 'components/Test/Parts/TestWritten';
import TestRecords from 'components/Test/Parts/TestRecords';
import TestHomeowners from 'components/Test/Parts/TestHomeowners';
import TestEmployment from 'components/Test/Parts/TestEmployment';
import TestFinancial from 'components/Test/Parts/TestFinancial';
import TestReview from 'components/Test/Parts/TestReview';
import TestAffiliateLayout from 'layouts/TestAffiliateLayout';
import CyclesPage from 'pages/affiliate-portal/cycles';
import TestApplications from 'pages/affiliate-portal/cycles/[cycleId]';
import TestApplicationDetails from 'pages/affiliate-portal/cycles/[cycleId]/[applicationId]';
import AffiliatePortalHomePage from 'pages/affiliate-portal/home';
import AffiliatePortalRepairsPage from 'pages/affiliate-portal/repairs';
import AffiliatePortalVolunteersPage from 'pages/affiliate-portal/volunteers';
import AffiliatePortalSettingsPage from 'pages/affiliate-portal/settings';
import { TestTerms } from 'components/Test/Parts/TestTerms';
import { NewLandingLayout } from 'pages/index/Layout/NewLandingLayout';
import LandingPage from 'pages/index/LandingPage';
import TermsPage from 'pages/terms/TermsPage';
import PrivacyPage from 'pages/privacy';
import ContactPage from 'pages/contact';
import { TestLayout } from './components/Test/Layout/TestLayout';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
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
            <TestLayout />
          </Authenticator.Provider>
        }
      >
        <Route path=":habitat">
          <Route path="home" element={<TestHome />} />
          <Route path="terms" element={<TestTerms />} />
          <Route path="applicant-info" element={<TestApplicantInfo />} />
          <Route
            path="applicant-optional"
            element={<TestApplicantOptional />}
          />
          <Route path="checklist" element={<TestChecklist />} />
          <Route path="written" element={<TestWritten />} />
          <Route path="records" element={<TestRecords />} />
          <Route path="homeowners" element={<TestHomeowners />} />
          <Route path="employment" element={<TestEmployment />} />
          <Route path="financial" element={<TestFinancial />} />
          <Route path="review" element={<TestReview />} />
        </Route>
      </Route>

      <Route path="affiliate-portal">
        <Route
          path=":habitat"
          element={
            <Authenticator.Provider>
              <TestAffiliateLayout />
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
