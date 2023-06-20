import './assets/styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import { ApplicantPrescreenLayout } from './components/PreScreen/ApplicantPrescreenLayout';
import { PreLimLayout } from './components/PreScreen/PreLim/PreLimLayout';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { PreLimHome } from './components/PreScreen/PreLim/PreLimHome';
import { PreLimTerms } from './components/PreScreen/PreLim/PreLimTerms';
import { PreLimQuestions } from './components/PreScreen/PreLim/PreLimQuestions';
import { PreLimResults } from './components/PreScreen/PreLim/PreLimResults';
import { FormLayout } from './components/PreScreen/Form/FormLayout';
import { AffiliateLayout } from './components/Affiliate/AffiliateLayout';
import { LandingLayout } from './components/Landing/LandingLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingLayout />} />

      <Route path="affiliate">
        <Route path=":habitat">
          <Route path="home" element={<AffiliateLayout />} />
        </Route>
      </Route>

      <Route path="applicant">
        <Route path=":habitat">
          <Route path="prescreen" element={<ApplicantPrescreenLayout />}>
            <Route path="prelim" element={<PreLimLayout />}>
              <Route path="home" element={<PreLimHome />} />
              <Route path="terms" element={<PreLimTerms />} />
              <Route path="questions" element={<PreLimQuestions />} />
              <Route path="results" element={<PreLimResults />} />
            </Route>

            <Route
              path="form"
              element={
                <Authenticator>
                  <FormLayout />
                </Authenticator>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
