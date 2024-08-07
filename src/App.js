import './assets/styles/App.css';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApplicantCyclePage from 'pages/[habitat]/applicant/[cycleId]';
import HabitatLayout from 'layouts/HabitatLayout';
import { Authenticator } from '@aws-amplify/ui-react';
import ApplicantLayout from 'layouts/ApplicantLayout';
import { ROUTES } from 'utils/constants';
import ApplicantApplicationsPage from 'pages/[habitat]/applicant/applications';
import ApplicantDecisionsPage from 'pages/[habitat]/applicant/decisions/ApplicantDecisionsPage';
import AffiliateFormsPage from 'pages/[habitat]/affiliate/forms';
import CyclesPage from 'pages/[habitat]/affiliate/cycles';
import AffiliateLayout from 'layouts/AffiliateLayout';
import AffiliateCycleApplications from 'pages/[habitat]/affiliate/cycles/[cycleId]/AffiliateCycleApplications';
import AffiliateApplicationDetailsPage from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]/AffiliateApplicationDetailsPage';
import MaintenancePage from 'pages/maintenance/Maintenance';
import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';
import Landing from 'pages/landing';
import useRedirectToLegacy from 'hooks/utils/useRedirectToLegacy';
import './lib/i18n';
import Print from 'pages/print/page';
import { DataStore } from 'aws-amplify/datastore';
import { useEffect } from 'react';

function App() {
  useRedirectToLegacy();
  const { t } = useTranslation();

  useEffect(() => {
    DataStore.start();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <CheckMaintenance>
            <div style={{ height: 'auto', minHeight: '100vh', width: '100%' }}>
              <Landing />
            </div>
          </CheckMaintenance>
        }
      />

      <Route
        path={ROUTES.HABITAT}
        element={
          <Authenticator.Provider>
            <HabitatLayout />
          </Authenticator.Provider>
        }
      >
        <Route path={ROUTES.HABITAT_APPLICANT} element={<ApplicantLayout />}>
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
        <Route path={ROUTES.HABITAT_AFFILIATE} element={<AffiliateLayout />}>
          <Route
            path={ROUTES.HABITAT_AFFILIATE_HOME}
            element={<h1>{t('pages.underConstruction.message')}</h1>}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_FORMS}
            element={<AffiliateFormsPage />}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_ANALYTICS}
            element={<p>{t('pages.underConstruction.message')}</p>}
          />
          <Route
            path={ROUTES.HABITAT_AFFILIATE_USERS}
            element={<p>{t('pages.underConstruction.message')}</p>}
          />
          <Route path=":formId">
            <Route index element={<CyclesPage />} />
            <Route path={ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE}>
              <Route index element={<AffiliateCycleApplications />} />
              <Route
                path={ROUTES.HABITAT_AFFILIATE_CYCLES_CYCLE_APPLICATION}
                element={<AffiliateApplicationDetailsPage />}
              />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route
        path="/*"
        element={
          <CheckMaintenance>
            <h1>404</h1>
          </CheckMaintenance>
        }
      />

      <Route path={ROUTES.maintenance} element={<MaintenancePage />} />

      <Route path={ROUTES.PRINT} element={<Print />} />
    </Routes>
  );
}

export default App;
