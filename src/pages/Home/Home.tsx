import './Home.css';
import { useState, useEffect, useContext } from 'react';
import { signout } from '../../services/auth';
import { getUserDoc } from '../../services/db';

import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import UserHero from '../../components/UserHero/UserHero';
import Search from '../../components/Search/Search';
import Shelf from '../../components/Shelf/Shelf';

import Button from '@mui/material/Button';

function Home({ userID }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setLoading(true);

    getUserDoc(userID)
      .then(userDoc => {
        console.log('user doc retrieved: ', userDoc);
        setUser(userDoc);
        setLoading(false);
      })
      .catch(err => console.log(err));

  }, [])

  function handleSignout() {
    signout();
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
            name={user.full_name}
            imageLink={user.photoURL}
          />
          <Search />
          {/* <Shelf books={shelf} /> */}
        </>
      )}
    </div>
  );
}

export default Home;