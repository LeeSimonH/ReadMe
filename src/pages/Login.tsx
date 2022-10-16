import { useState, useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import jwt_decode from "jwt-decode";

import { GoogleLogin } from '@react-oauth/google';
import '../App.css';


function Login(): JSX.Element {
  const { setUser } = useContext(UserContext);
  const [accessToken, setAccessToken] = useState(null);

  async function handleCallbackResponse(tokenResponse) {
    console.log('Token response ', tokenResponse);
    console.log('Encoded JWT ID token: ', tokenResponse.credential);
    console.log('decoded JWT: ', jwt_decode(tokenResponse.credential));

    const decodedTokenCredential = jwt_decode(tokenResponse.credential);
    console.log('decoded JWT: ', decodedTokenCredential);

    setUser(decodedTokenCredential);
  }


  return (
    <GoogleLogin
      onSuccess={handleCallbackResponse}
      onError={() => {
        console.log('Login failed')
      }}
    />
    // <GoogleLoginBtn onCallbackResponse={handleCallbackResponse} />
  )
}

export default Login;