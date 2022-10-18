import './App.css';
import { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';

function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  // const [session, setSession] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, signedInUser => {
      if (signedInUser) {
        // user is signed in
        setUser(signedInUser);
        setAccessToken(signedInUser.accessToken);
      } else {
        // user is signed out
        setUser(null);
        setAccessToken(null);
      }
    })
  }, [])

  return (
    <div className="App">
      {user ? (
        <Home user={user} />
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default App;