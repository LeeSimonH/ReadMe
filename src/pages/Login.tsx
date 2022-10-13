import { useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { GoogleUser } from '../types/types';
import jwt_decode from "jwt-decode";
import '../App.css';

import GoogleLoginBtn from '../components/GoogleLoginButton';

function Login(): JSX.Element {
  const { setUser } = useContext(UserContext);

  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ', response.credential);
    const userObject: GoogleUser = jwt_decode(response.credential);
    console.log('user object: ', userObject);
    setUser(userObject);
  }

  return (
    <GoogleLoginBtn onCallbackResponse={handleCallbackResponse} />
  )
}

export default Login;