import '../assets/sass/auth.scss';
import { useState } from 'react';

import { signInWithGooglePopup, signInWithEmail, createUser } from '../services/auth';

import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';

export default function Auth(): JSX.Element {
  const [signingUp, setSigningUp] = useState(false);

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

      {signingUp ? (
        <SignUpForm onSubmit={handleSignUp} />
      ) : (
        <LoginForm onSubmit={handleSignIn} toggleForm={toggleForm} />
      )}

      <Divider>OR</Divider>

      <Button
        id="google-login-btn"
        variant="outlined"
        onClick={handleGoogleLogin}
        startIcon={<GoogleIcon />}
      >

        Log in with Google
      </Button>
    </Box>
  )
}