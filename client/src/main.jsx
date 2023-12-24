import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import {Provider} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store/index.js';
import {
  BrowserRouter
} from "react-router-dom";
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
