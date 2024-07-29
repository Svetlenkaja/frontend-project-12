import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import { initReactI18next } from 'react-i18next';
import App from './App.js';
import resources from './locales';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import AuthProvider from './context/authContext';
import SocketContext from './context/socketContext';
import { io } from 'socket.io-client';
import { ToastContainer } from 'react-toastify';
import filter from 'leo-profanity';


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
    <BrowserRouter>
      <SocketContext.Provider value={socket}>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              < App />
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </SocketContext.Provider>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default init;