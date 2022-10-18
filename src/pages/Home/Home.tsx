import './Home.css';
import { useState, useEffect, useContext } from 'react';
import { signOut } from 'firebase/auth';

import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import UserHero from '../../components/UserHero/UserHero';
import Search from '../../components/Search/Search';
import Shelf from '../../components/Shelf/Shelf';

import Button from '@mui/material/Button';
// import SearchResults from '../../components/SearchResults/SearchResults';

function Home({ user }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [shelf, setShelf] = useState([]);

  const { email, displayName, photoURL, uid } = user;

  useEffect(() => {
    console.log('signed in as user: ', user);
    setLoading(false);
  }, [])

  function handleSignout() {
    signOut();
  }

  return (
    <div id="Home">
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <Button
            id="signout-btn"
            variant="outlined"
            onClick={handleSignout}
          >
            Sign out
          </Button>
          <UserHero
            name={displayName}
            imageLink={photoURL}
          />
          <Search />
          <Shelf books={shelf} />
        </>
      )}
    </div>
  );
}

export default Home;