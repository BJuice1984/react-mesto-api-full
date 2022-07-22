import React from 'react';
import ReactDOM from 'react-dom';
import './pages/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
