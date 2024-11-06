import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/Store.jsx';   

const root = ReactDOM.createRoot(document.getElementById('root'));  // create root and render
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
