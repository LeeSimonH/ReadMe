import './Home.css';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../contexts/UserContext';

import Shelf from '../components/Shelf';
import NewBookForm from '../components/NewBookForm';
import Book from '../components/Book';
import { BookProps } from '../types/types';

import Button from '@mui/material/Button';

function Home(): JSX.Element {
  const { user, setUser } = useContext(UserContext);

  function handleSignout() {
    setUser(null);
  }

  const [books, setBooks] = useState<
    Array<BookProps>
  >([]);

  function addBookToShelf(props: BookProps) {
    setBooks(currBooks => {
      console.log(books);
      return [...currBooks, props];
    });
  }

  return (
    <div id="Home">
      <Button variant="outlined" onClick={handleSignout} >Sign out</Button>
      <Shelf books={books} />
      <NewBookForm onSubmit={addBookToShelf} />
    </div>
  );
}

export default Home;