import './assets/sass/_main.scss';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
  const [userID, setUserID] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // user is signed in
        setUserID(user.uid);
        setAccessToken(user.accessToken);
      } else {
        // user is signed out
        setUserID(null);
        setAccessToken(null);
      }
    })
  }, [])

  return (
    <div className="App">
      {userID ? (
        <Home userID={userID} />
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App;