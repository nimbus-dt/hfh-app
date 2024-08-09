import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { PostHogProvider } from 'posthog-js/react';
import theme from 'styles/theme';
import 'styles';
import 'components/Formio';

import HabitatProvider from 'components/HabitatProvider';
import App from './App';
import amplifyconfig from './amplifyconfiguration.json';

Amplify.configure(amplifyconfig);

const rootElement = document.getElementById('root');

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <PostHogProvider
          apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
          options={options}
        >
          <HabitatProvider>
            <App />
          </HabitatProvider>
        </PostHogProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
