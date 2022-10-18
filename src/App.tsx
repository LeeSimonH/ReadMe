import { useState, useEffect } from 'react';
import { useAppContext } from './contexts/AppContext';
import './App.css';

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  const [session, setSession] = useState(null);
  const { auth } = useAppContext();

  useEffect(() => {
    auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, [])

  return (
    <div className="App">
      {session ? (
        <Home session={session} />
      ) : (
        <Login />
      )}
    </div>
  )
}

export default App;