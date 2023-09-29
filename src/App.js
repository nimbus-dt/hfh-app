import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';

import AffiliateLayout from 'layouts/AffiliateLayout';
import AffiliatePrescreensPage from 'pages/affiliate/home';
import AffiliateApplicationDetailPage from 'pages/affiliate/application-detail';

import PreLimLayout from 'layouts/PreLimLayout';
import FormApplicationsPage from 'pages/applicant/prescreen/form/apps';
import PreLimHomePage from 'pages/applicant/prescreen/prelim/home';
import PreLimTermsPage from 'pages/applicant/prescreen/prelim/terms';
import PreLimQuestionsPage from 'pages/applicant/prescreen/prelim/questions';
import PreLimResultsPage from 'pages/applicant/prescreen/prelim/results';

import { ApplicantPrescreenLayout } from 'components/PreScreen/ApplicantPrescreenLayout';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { FormPreScreen } from './components/PreScreen/Form/FormPreScreen';
import { LandingLayout } from './components/Landing/LandingLayout';
import { LandingHome } from './components/Landing/LandingHome';
import { LandingAbout } from './components/Landing/LandingAbout';
import { LandingTerms } from './components/Landing/LandingTerms';
import { LandingPrivacyPolicy } from './components/Landing/LandingPrivacyPolicy';
import { LandingReturn } from './components/Landing/LandingReturn';
import { LandingContact } from './components/Landing/LandingContact';
import { Test } from './components/Test';
import { FormUserForm } from './components/PreScreen/Form/FormUserForm';
import { FormLayoutNew } from './components/PreScreen/Form/FormLayoutNew';
import { FormInfoPage } from './components/PreScreen/Form/FormInfoPage';
import { LandingNewPricing } from './components/Landing/LandingNewPricing';
import AffiliateSettingsPage from './pages/affiliate/settings';
import AffiliateBillingPage from './pages/affiliate/billing';
import AffiliateCyclesPage from './pages/affiliate/cycles';

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
        <Route index element={<LandingLayout comp={<LandingHome />} />} />
        <Route
          path="about"
          element={<LandingLayout comp={<LandingAbout />} />}
        />
        <Route
          path="privacy"
          element={<LandingLayout comp={<LandingPrivacyPolicy />} />}
        />
        <Route
          path="terms"
          element={<LandingLayout comp={<LandingTerms />} />}
        />
        <Route
          path="return"
          element={<LandingLayout comp={<LandingReturn />} />}
        />
        <Route
          path="contact"
          element={<LandingLayout comp={<LandingContact />} />}
        />
        <Route
          path="pricing"
          element={<LandingLayout comp={<LandingNewPricing />} />}
        />
      </Route>

      <Route path="test" element={<Test />} />

      <Route path="affiliate">
        <Route
          path=":habitat"
          element={
            <Authenticator hideDefault hideSignUp>
              <AffiliateLayout />
            </Authenticator>
          }
        >
          <Route path="home" element={<AffiliatePrescreensPage />} />
          <Route
            path="applications/:applicationId"
            element={<AffiliateApplicationDetailPage />}
          />
          <Route path="settings" element={<AffiliateSettingsPage />} />
          <Route path="cycle" element={<AffiliateCyclesPage />} />
          <Route path="billing" element={<AffiliateBillingPage />} />
        </Route>
      </Route>

      <Route
        path="applicant"
        element={
          <ScrollView height="100vh" width="100%">
            <Outlet />
          </ScrollView>
        }
      >
        <Route path=":habitat">
          <Route path="prescreen" element={<ApplicantPrescreenLayout />}>
            <Route path="prelim" element={<PreLimLayout />}>
              <Route path="home" element={<PreLimHomePage />} />
              <Route path="terms" element={<PreLimTermsPage />} />
              <Route path="questions" element={<PreLimQuestionsPage />} />
              <Route path="results" element={<PreLimResultsPage />} />
            </Route>
            <Route path="form" element={<FormLayoutNew />}>
              <Route path="info" element={<FormInfoPage />} />
              <Route path="user" element={<FormUserForm />} />
              <Route path="apps" element={<FormApplicationsPage />} />
              <Route path="app" element={<FormPreScreen />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
