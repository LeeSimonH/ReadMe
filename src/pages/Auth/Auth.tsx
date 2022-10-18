import './Auth.css';
import { useState, useContext, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  getRedirectResult,
} from 'firebase/auth';
import { auth, provider } from './../../services/firebase';

import LoginForm from '../../components/Auth/LoginForm';
import SignUpForm from '../../components/Auth/SignUpForm';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

export default function Auth(): JSX.Element {
  const [signingUp, setSigningUp] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleForm(e) {
    e.preventDefault();
    setSigningUp(prev => !prev);
  }

  function handleSignUp() {
    createUser(email, password);
  }

  function handleSignIn() {
    signInWithEmail(email, password);
  }

  function handleGoogleLogin() {
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
        console.log('There was an error signing in with google.')
        console.log('Error code: ', error.code);
        console.log('Error message: ', error.message);
        console.log('Email used: ', error.customData.email);
        console.log('AuthCredential type used: ', GoogleAuthProvider.credentialFromError(error));
      });
  }

  // TO-DO: Extract Login/Sign Up Form components
  return (
    <Box id="auth-form">
      <Button onClick={toggleForm}>
        {signingUp ? 'Sign In' : 'Sign Up'}
      </Button>

      {signingUp ? (
        <SignUpForm onSubmit={handleSignUp} />
      ) : (
        <LoginForm onSubmit={handleSignIn} />
      )}

      <Divider>OR</Divider>

      <Button
        variant="outlined"
        onClick={handleGoogleLogin}
      >
        Log in with Google
      </Button>
    </Box>
  )
}