import './Auth.css';
import { useState, useContext, useEffect } from 'react';

import { signInWithGooglePopup, signInWithEmail, createUser } from '../../services/auth';

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
    signInWithGooglePopup();
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