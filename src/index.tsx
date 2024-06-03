import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';
import { PostHogProvider } from 'posthog-js/react';

import theme from 'styles/theme';

import 'styles';
import 'components';

import App from './App';
import awsExports from './aws-exports';

Amplify.configure(awsExports);

const rootElement = document.getElementById('root');

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <PostHogProvider
            apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
            options={options}
          >
            <App />
          </PostHogProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
