import './assets/styles/App.css';
// eslint-disable-next-line import/no-unresolved
import '@aws-amplify/ui-react/styles.css';
import { RouterProvider } from 'react-router-dom';
import './lib/i18n';
import router from 'router';

function App() {
  // useRedirectToLegacy();

  return <RouterProvider router={router} />;
}

export default App;
