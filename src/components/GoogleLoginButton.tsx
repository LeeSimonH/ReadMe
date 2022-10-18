import { useEffect } from 'react';
import jwt_decode from "jwt-decode";

function GoogleLoginBtn(/* onCallBackResponse */): JSX.Element {
  useEffect(() => {
    const CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;

    // DO NOT REMOVE COMMENT BELOW
    // IDENTIFIES GLOBAL GOOGLE OBJECT
    /* global google */

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      // callback: onCallbackResponse,
      callback: (tokenResponse) => {
        console.log('Token response ', tokenResponse);
        console.log('Encoded JWT ID token: ', tokenResponse.credential);

        const decodedTokenCredential = jwt_decode(tokenResponse.credential);
        console.log('decoded JWT: ', jwt_decode(tokenResponse.credential));
      }
    });

    google.accounts.id.renderButton(
      document.getElementById('google-sign-in'),
      { theme: 'outline', size: 'large' }
    )

    // one-tap prompt
    // google.accounts.id.prompt();
  }, [])

  return (
    <div id="google-sign-in">
    </div>
  );

}

export default GoogleLoginBtn;