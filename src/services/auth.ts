import { auth, provider } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

export async function createUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const newUser = userCredential.user;
      console.log('new user created: ', newUser);
    })
    .catch(err => {
      console.log('There was an error creating a new user.')
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message)
    })
}

export async function signInWithEmail(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const signedInUser = userCredential.user;
      console.log('new user signed in: ', signedInUser);
    })
    .catch(err => {
      console.log('There was an error signing in.')
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message)
    })
}

export async function signInWithGooglePopup() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log('returned token: ', token);
      // The signed-in user info.
      const user = result.user;
      console.log('the signed-in user: ', user);
    }).catch((error) => {
      // Handle Errors 
      console.log('There was an error signing in with Google.')
      console.log('Error code: ', error.code);
      console.log('Error message: ', error.message);
      console.log('Email used: ', error.customData.email);
      console.log('AuthCredential type used: ', GoogleAuthProvider.credentialFromError(error));
    });
}

export async function signout() {
  signOut(auth);
}