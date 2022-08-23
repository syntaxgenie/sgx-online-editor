import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppContexts from "./contexts";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions";
import { BrowserRouter } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBWwQ_Q6MvWLHgBm9mRGvVX6hvgV8wpTUg",
  authDomain: "webgpu-editor.firebaseapp.com",
  projectId: "webgpu-editor",
  storageBucket: "webgpu-editor.appspot.com",
  messagingSenderId: "425550566157",
  appId: "1:425550566157:web:4b029a30d3c0b42f539644",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firestore = firebaseApp.firestore();
const firebaseFunction = firebase.functions();
firestore.enablePersistence({ synchronizeTabs: true });

ReactDOM.render(
  <BrowserRouter>
    <AppContexts>
      <App />
    </AppContexts>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export { firestore, firebaseFunction as firenaseFunction };
