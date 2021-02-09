import React from 'react';
import ReactDOM from 'react-dom';
import JobCannon from './JobCannon.jsx';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <JobCannon />,
  document.getElementById('root')
);

serviceWorker.unregister();
