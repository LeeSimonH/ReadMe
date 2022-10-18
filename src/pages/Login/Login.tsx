import './Login.css';
import { useState, useContext, useEffect } from 'react';
import { useAppContext } from '../../contexts/AppContext';

import GoogleLoginBtn from '../../components/GoogleLoginButton';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

function Login(): JSX.Element {
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithEmail } = useAppContext();


  // To do: Refactor to single handleLogin function
  // - take extra optional parameter "provider"
  // - await signInWith(Provider)
  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = await signInWithEmail(email, password);
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const { error } = signInWithGoogle();
      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  // TO-DO: Extract Login/Sign Up Form components
  return (
    <Box id="auth-form">
      {loading ? (
        'Signing in...'
      ) : (
        <form
          autoComplete='off'
          onSubmit={handleLogin}
        >
          <Stack direction="row" className="btn-group">
            <Button
              variant="text"
              disabled={!signingUp ? true : false}
              onClick={(e) => {
                e.preventDefault();
                setSigningUp(false);
              }}
            >
              Sign In
            </Button>
            <Button
              variant="text"
              disabled={signingUp ? true : false}
              onClick={(e) => {
                e.preventDefault();
                setSigningUp(true);
              }}
            >
              Sign Up
            </Button>
          </Stack>
          <FormControl>
            <InputLabel htmlFor="email">Email</InputLabel>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby='email-helper-text' />
            <FormHelperText id="email-helper-text">Enter your email</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-describedby='password-helper-text' />
            <FormHelperText id="password-helper-text">Enter a secure password</FormHelperText>
          </FormControl>
          <Stack direction="row" className="btn-group">
            <Button
              variant="outlined"
              onClick={() => {
                setEmail('');
                setPassword('');
              }}
            >
              Reset
            </Button>
            <Button type="submit" variant="contained">Submit</Button>
          </Stack>
          <Divider>OR</Divider>
          <Button
            variant="outlined"
            onClick={handleGoogleLogin}
          >
            Log in with Google
          </Button>
          {/* <GoogleLoginBtn /> */}
        </form>
      )}
    </Box>
  )
}

export default Login;