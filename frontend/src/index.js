import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import init from './init.jsx';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const html = document.querySelector('html');
const body = document.querySelector('body');
html.classList.add('h-100');
body.classList.add('h-100');
document.getElementById('root').classList.add('h-100');
const initApp = await init();
root.render(
  <React.StrictMode>
    {initApp}
  </React.StrictMode>,
);
