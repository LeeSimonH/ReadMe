import './Home.css';
import { useState, useEffect, useContext } from 'react';
import { useAppContext } from '../../contexts/AppContext';

import LoadingCircle from '../../components/LoadingCircle/LoadingCircle';
import UserHero from '../../components/UserHero/UserHero';
import Search from '../../components/Search/Search';
import Shelf from '../../components/Shelf/Shelf';
import NewBookForm from '../../components/NewBookForm/NewBookForm';

import Button from '@mui/material/Button';
import SearchResults from '../../components/SearchResults/SearchResults';

function Home({ session }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { signout } = useAppContext();

  useEffect(() => {
    getProfile();
  }, [])

  async function getProfile() {
    try {
      setLoading(true);
      const { user } = session;
      setUser(user);
      console.log('current user: ', user);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleSignout() {
    signout();
  }

  const [shelf, setShelf] = useState([]);

  // function addBookToShelf(props) {
  //   setShelf(currBooks => {
  //     console.log('shelf: ' + shelf);
  //     return [...currBooks, props];
  //   });
  // }

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
          >Sign out</Button>
          <UserHero
            name={session.user.user_metadata.full_name}
            imageLink={session.user.user_metadata.picture}
          />
          <Search />
          <Shelf books={shelf} />
          {/* <NewBookForm onSubmit={addBookToShelf} /> */}
        </>
      )}
    </div>
  );
}

export default Home;