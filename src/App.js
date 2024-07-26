import './assets/styles/App.css';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApplicantCyclePage from 'pages/[habitat]/applicant/[cycleId]';
import HabitatLayout from 'layouts/HabitatLayout';
import ApplicantLayout from 'layouts/ApplicantLayout';
import { ROUTES } from 'utils/constants';
import ApplicantApplicationsPage from 'pages/[habitat]/applicant/applications';
import ApplicantDecisionsPage from 'pages/[habitat]/applicant/decisions/ApplicantDecisionsPage';
import AffiliateFormsPage from 'pages/[habitat]/affiliate/forms';
import CyclesPage from 'pages/[habitat]/affiliate/cycles';
import NewAffiliateLayout from 'layouts/NewAffiliateLayout';
import AffiliateCycleApplications from 'pages/[habitat]/affiliate/cycles/[cycleId]/AffiliateCycleApplications';
import AffiliateApplicationDetailsPage from 'pages/[habitat]/affiliate/cycles/[cycleId]/[applicationId]/AffiliateApplicationDetailsPage';
import MaintenancePage from 'pages/maintenance/Maintenance';
import CheckMaintenance from 'layouts/Maintenance/CheckMaintenance';
import Landing from 'pages/landing';
import useRedirectToLegacy from 'hooks/utils/useRedirectToLegacy';
import './lib/i18n';
import Print from 'pages/print/page';
import { Form } from '@formio/react';

function App() {
  useRedirectToLegacy();
  const { t } = useTranslation();

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

      <Route path={ROUTES.HABITAT} element={<HabitatLayout />}>
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
        <Route path={ROUTES.HABITAT_AFFILIATE} element={<NewAffiliateLayout />}>
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
      <Route
        path="test"
        element={
          <Form
            src="https://form.habitat-app.org/jcxuakumlexxzla/test/camera-frame"
            onRender={() => {
              const form = document.querySelector('div.formio-component-form');

              const observer = new MutationObserver(
                (mutationList, observer) => {
                  console.log('mutationList', mutationList);
                  for (const mutation of mutationList) {
                    if (mutation.type === 'childList') {
                      for (const addedNode of mutation.addedNodes) {
                        console.log('addedNode', addedNode);
                        if (addedNode instanceof HTMLElement) {
                          const videoContainer = addedNode.querySelector(
                            'div.video-container'
                          );
                          if (
                            videoContainer &&
                            videoContainer instanceof HTMLElement
                          ) {
                            const div = document.createElement('div');

                            div.classList.add('hfh_formio_file_video_frame');

                            videoContainer.classList.add(
                              'hfh_formio_file_video_container'
                            );

                            videoContainer.appendChild(div);

                            const video =
                              addedNode.querySelector('video.video');

                            video.classList.add('hfh_formio_file_video');
                          }
                        }
                      }
                    }

                    if (
                      mutation.type === 'attributes' &&
                      mutation.target instanceof HTMLImageElement
                    ) {
                      mutation.target.onerror = () => {
                        mutation.target.src =
                          'https://public-bucket-hfh.s3.amazonaws.com/app/file_icon.png';
                      };
                    }
                  }
                }
              );

              observer.observe(form, {
                attributes: true,
                childList: true,
                subtree: true,
              });
            }}
          />
        }
      />
    </Routes>
  );
}

export default App;
