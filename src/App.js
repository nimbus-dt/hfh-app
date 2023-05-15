import './assets/styles/App.css';
import { Routes, Route } from 'react-router-dom';
import { ApplicantPrescreenLayout } from './components/PreScreen/ApplicantPrescreenLayout';
import { PreLim } from './components/PreScreen/PreLim';

// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Landing</h1>} />

      <Route path="affiliate">
        <Route path="prescreen" element={<h1>PreScreen</h1>} />
      </Route>

      <Route path="applicant">
        <Route path=":habitat">
          <Route path="prescreen" element={<ApplicantPrescreenLayout />}>
            <Route path="prelim" element={<PreLim />} />
            <Route path="form" element={<h1>Form</h1>} />
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
