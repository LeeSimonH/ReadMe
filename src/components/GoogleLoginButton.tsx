import { useState, useEffect } from 'react';
import credentials from '../../gapi-credentials.json';

function GoogleLoginBtn({ onCallbackResponse }): JSX.Element {
  useEffect(() => {
    const CLIENT_ID: string = credentials.web.client_id;
    console.log(CLIENT_ID);

    /* global google */

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: onCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-sign-in'),
      { theme: 'outline', size: 'large' }
    )
  }, [])

  return (
    <div id="google-sign-in">
    </div>
  );

}

export default GoogleLoginBtn;