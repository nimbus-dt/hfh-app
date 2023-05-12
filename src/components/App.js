import '../assets/styles/App.css';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Landing</h1>} />

      <Route path="affiliate" element={<h1>Affiliate</h1>}>
        <Route path="prescreen" element={<h1>PreScreen</h1>} />
      </Route>

      <Route path="applicant" element={<h1>Applicant</h1>}>
        <Route path="/:habitat">
          <Route path="prescreen" element={<h1>PreScreen</h1>}>
            <Route path="prelim" element={<h1>Preliminary</h1>} />
            <Route path="form" element={<h1>Form</h1>} />
          </Route>
        </Route>
      </Route>
      <Route path="/*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
