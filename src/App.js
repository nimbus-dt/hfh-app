import './assets/styles/App.css';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Authenticator, ScrollView } from '@aws-amplify/ui-react';
import { ApplicantPrescreenLayout } from './components/PreScreen/ApplicantPrescreenLayout';
import { PreLimLayout } from './components/PreScreen/PreLim/PreLimLayout';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { PreLimHome } from './components/PreScreen/PreLim/PreLimHome';
import { PreLimTerms } from './components/PreScreen/PreLim/PreLimTerms';
import { PreLimQuestions } from './components/PreScreen/PreLim/PreLimQuestions';
import { PreLimResults } from './components/PreScreen/PreLim/PreLimResults';
import { FormPreScreen } from './components/PreScreen/Form/FormPreScreen';
import { LandingLayout } from './components/Landing/LandingLayout';
import { LandingHome } from './components/Landing/LandingHome';
import { LandingAbout } from './components/Landing/LandingAbout';
import { LandingTerms } from './components/Landing/LandingTerms';
import { LandingPrivacyPolicy } from './components/Landing/LandingPrivacyPolicy';
import { LandingReturn } from './components/Landing/LandingReturn';
import { LandingContact } from './components/Landing/LandingContact';
import { Test } from './components/Test';
import { FormApplications } from './components/PreScreen/Form/FormApplications';
import { FormUserForm } from './components/PreScreen/Form/FormUserForm';
import { FormLayoutNew } from './components/PreScreen/Form/FormLayoutNew';
import { FormInfoPage } from './components/PreScreen/Form/FormInfoPage';
import { CycleForm } from './components/Affiliate/CycleForm';
import { LandingNewPricing } from './components/Landing/LandingNewPricing';
import AffiliateLayout from './layouts/AffiliateLayout';
import { AffiliatePrescreens } from './components/Affiliate/AffiliatePrescreens';
import AffiliateSettingsPage from './pages/Affiliate/Settings';
import AffiliateBillingPage from './pages/Affiliate/Billing';

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
          <Route path="home" element={<AffiliatePrescreens />} />
          <Route path="settings" element={<AffiliateSettingsPage />} />
          <Route path="cycle" element={<CycleForm />} />
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
              <Route path="home" element={<PreLimHome />} />
              <Route path="terms" element={<PreLimTerms />} />
              <Route path="questions" element={<PreLimQuestions />} />
              <Route path="results" element={<PreLimResults />} />
            </Route>
            <Route path="form" element={<FormLayoutNew />}>
              <Route path="info" element={<FormInfoPage />} />
              <Route path="user" element={<FormUserForm />} />
              <Route path="apps" element={<FormApplications />} />
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
