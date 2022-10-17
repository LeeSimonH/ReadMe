import { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  // Initialize supabase client
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const [user, setUser] = useState("");
  const [error, setError] = useState("");

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    })

    if (data) {
      console.log('sign in successful! returned data: ', data);
    } else if (error) {
      console.log('error occured signing in: ', error)
    }
  }

  async function signout() {
    const { error } = await supabase.auth.signOut()

  }

  return (
    <AppContext.Provider
      value={{
        supabase,
        auth: supabase.auth,
        error,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

const useAppContext = () => useContext(AppContext);

export { AppContext as default, AppContextProvider, useAppContext };