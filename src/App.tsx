import { useState } from 'react';
// import { AppContextProvider, useAppContext } from './contexts/AppContext';
import './App.css';

import UserContext from './contexts/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { User } from './types/types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const value = { user, setUser };

  // const { user, setUser } = useAppContext();

  return (
    // <AppContextProvider>
    //   <div className="App">
    //       {user ? <Home /> : <Login />}
    //     </div>
    // </AppContextProvider>

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
      <UserContext.Provider value={value} >
        <div className="App">
          {user ? <Home /> : <Login />}
        </div>
      </UserContext.Provider>
    </GoogleOAuthProvider>

  )
}

export default App;