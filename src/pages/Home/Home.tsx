import './Home.css';
import { useState, useEffect, useContext } from 'react';
import { signout } from '../../services/auth';
import { getUserDoc, getAllUserBooks, addBookToUserShelf } from '../../services/db';

import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import UserHero from '../../components/UserHero/UserHero';
import Search from '../../components/Search/Search';
import Shelf from '../../components/Shelf/Shelf';

import Button from '@mui/material/Button';

function Home({ userID }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [shelf, setShelf] = useState<string[]>([]);

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

  return (
    <div id="Home">
      {loading ? (
        <LoadingCircle />
      ) : (
        <>
          <Button
            id="signout-btn"
            variant="outlined"
            onClick={signout}
          >
            Sign out
          </Button>
          <UserHero
            name={user.fullName}
            imageLink={user.photoURL}
          />
          <Shelf userID={userID} />
          <Search />
        </>
      )}
    </div>
  );
}

export default Home;