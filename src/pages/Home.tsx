import './Home.css';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { googleLogout } from '@react-oauth/google';

import UserHero from '../components/UserHero/UserHero';
import Shelf from '../components/Shelf/Shelf';
import NewBookForm from '../components/NewBookForm/NewBookForm';

import { BookProps } from '../types/types';

import Button from '@mui/material/Button';

function Home(): JSX.Element {
  const { user, setUser } = useContext(UserContext);

  // const [books, setBooks] = useState<
  //   Array<BookProps>
  // >([]);

  // useEffect(() => {
  //   console.log('current user: ', user);
  //   console.log(user.name);
  //   console.log(user.picture);
  // })

  function handleSignout() {
    googleLogout();
    setUser(null);
  }


  const [shelf, setShelf] = useState([]);

  function addBookToShelf(props: BookProps) {
    setShelf(currBooks => {
      console.log('shelf: ' + shelf);
      return [...currBooks, props];
    });
  }

  return (
    <div id="Home">
      <UserHero name={user.name} imageLink={user.picture ? user.picture : null} />
      <Button variant="outlined" onClick={handleSignout} >Sign out</Button>
      <Shelf books={shelf} />
      <NewBookForm onSubmit={addBookToShelf} />
    </div>
  );
}

export default Home;