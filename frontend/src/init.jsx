import React from 'react';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';
import store from './slices/index.js';
import AuthProvider from './context/authContext';
import SocketContext from './context/socketContext';
import resources from './locales';
import App from './App.js';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
};

const init = async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources,
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
  filter.add(filter.getDictionary('en'));
  filter.add(filter.getDictionary('ru'));

  const socket = io();
  socket.connect();

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <BrowserRouter>
          <SocketContext.Provider value={socket}>
            <Provider store={store}>
              <I18nextProvider i18n={i18n}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </I18nextProvider>
            </Provider>
          </SocketContext.Provider>
          <ToastContainer />
        </BrowserRouter>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
