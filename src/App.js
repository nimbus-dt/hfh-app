import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';

import PreLimLayout from 'layouts/PreLimLayout';
import FormApplicationsPage from 'pages/applicant/prescreen/form/apps';
import FormPreScreenPage from 'pages/applicant/prescreen/form/app';
import PreLimHomePage from 'pages/applicant/prescreen/prelim/home';
import PreLimTermsPage from 'pages/applicant/prescreen/prelim/terms';
import PreLimQuestionsPage from 'pages/applicant/prescreen/prelim/questions';
import PreLimResultsPage from 'pages/applicant/prescreen/prelim/results';

import { ApplicantPrescreenLayout } from 'components/PreScreen/ApplicantPrescreenLayout';

import AffiliateLayout from 'layouts/AffiliateLayout';
import AffiliatePrescreensPage from 'pages/affiliate/apps';
import AffiliateApplicationDetailPage from 'pages/affiliate/application-detail';
import AffiliateSettingsPage from './pages/affiliate/settings';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
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
import AffiliateHomePage from './pages/affiliate/home';
import AffiliateRepairsPage from './pages/affiliate/repairs';
import AffiliateVolunteersPage from './pages/affiliate/volunteers';

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
          <Route path="home" element={<AffiliateHomePage />} />
          <Route path="apps" element={<AffiliatePrescreensPage />} />
          <Route path="repairs" element={<AffiliateRepairsPage />} />
          <Route path="volunteers" element={<AffiliateVolunteersPage />} />

          <Route
            path="applications/:applicationId"
            element={<AffiliateApplicationDetailPage />}
          />
          <Route path="settings" element={<AffiliateSettingsPage />} />
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
              <Route path="app" element={<FormPreScreenPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
