import { useState, useEffect } from 'react';

function GoogleLoginBtn({ onCallbackResponse }): JSX.Element {
  useEffect(() => {
    const CLIENT_ID: string = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    console.log(CLIENT_ID);

    // DO NOT REMOVE COMMENT BELOW
    // IDENTIFIES GLOBAL GOOGLE OBJECT
    /* global google */

    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: onCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-sign-in'),
      { theme: 'outline', size: 'large' }
    )

    // one-tap prompt
    google.accounts.id.prompt();
  }, [])

  return (
    <div id="google-sign-in">
    </div>
  );

}

export default GoogleLoginBtn;