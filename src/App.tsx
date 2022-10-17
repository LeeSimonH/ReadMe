import { useState } from 'react';
import './App.css';

import UserContext from './contexts/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';

import { GoogleOAuthProvider } from '@react-oauth/google';
import keys from '../gapi-credentials.json';
import { User } from './types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const value = { user, setUser };

  return (
    <GoogleOAuthProvider clientId={keys.web.client_id} >
      <UserContext.Provider value={value} >
        <div className="App">
          {user ? <Home /> : <Login />}
        </div>
      </UserContext.Provider>
    </GoogleOAuthProvider>

  )
}

export default App;