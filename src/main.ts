import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import './index.css';
import './fonts';
import { ProgressProviders } from './lib/progress/ProgressProviders';

ReactDOM.createRoot(document.getElementById('root')!).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(ProgressProviders, null, React.createElement(App)),
  ),
);
