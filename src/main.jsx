// import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';
import FirebaseContext from './context/firebase';
import { firebaseApp, FieldValue } from './lib/firebase';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebaseApp, FieldValue }}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
