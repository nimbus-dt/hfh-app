import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Amplify, Storage } from 'aws-amplify';
import { Provider } from 'react-redux';
import App from './App';
import config from './aws-exports';
import { store } from './redux/configureStore';

Storage.configure({
  region: config.aws_user_files_s3_bucket_region,
  bucket: config.aws_user_files_s3_bucket,
  identityPoolId: config.aws_user_pools_id,
  level: 'protected',
});

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
