import { useState } from 'react';
import './App.css';

import UserContext from './contexts/UserContext';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const value = { user, setUser };

  return (
    <UserContext.Provider value={value} >
      <div className="App">
        {user ? <Home /> : <Login />}
      </div>
    </UserContext.Provider>
  )
}

export default App;