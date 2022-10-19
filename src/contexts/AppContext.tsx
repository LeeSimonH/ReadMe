// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signOut
} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_authDomain,
  databaseURL: import.meta.env.VITE_FIREBASE_databaseURL,
  projectId: import.meta.env.VITE_FIREBASE_projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_appId,
  measurementId: import.meta.env.VITE_FIREBASE_measurementId
};

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  // async function createUser(email: string, password: string) {
  //   return createUserWithEmailAndPassword(auth, email, password)
  //     .then(userCredential => {
  //       const newUser = userCredential.user;
  //       console.log('new user created: ', newUser);
  //       setUser(newUser);
  //     })
  //     .catch(err => {
  //       console.log('error code: ', err.code);
  //       console.log('error message: ', err.message)
  //     })
  // }

  // async function signInWithEmail(email: string, password: string) {
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then(userCredential => {
  //       const signedInUser = userCredential.user;
  //       console.log('new user signed in: ', signedInUser);
  //       setUser(signedInUser);
  //     })
  //     .catch(err => {
  //       console.log('error code: ', err.code);
  //       console.log('error message: ', err.message)
  //     })
  // }

  return (
    <AppContext.Provider
      value={ }
    >
      {children}
    </AppContext.Provider >
  );
}

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };