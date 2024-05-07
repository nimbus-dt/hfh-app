import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@aws-amplify/ui-react';
import theme from 'styles/theme';
import App from './App';
import awsExports from './aws-exports';
import { store } from './redux/configureStore';
import 'components/Formio';
import 'styles/formio/styles.css';

Amplify.configure(awsExports);

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
}
