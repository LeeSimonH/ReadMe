import './Home.css';
import { useState, useEffect } from 'react';

import Shelf from '../components/Shelf';
import NewBookForm from '../components/NewBookForm';
import Book from '../components/Book';
import { BookProps } from '../types/types';

import Button from '@mui/material/Button';

function Home(): React.ReactNode {
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
      <Shelf books={books} />
      <NewBookForm onSubmit={addBookToShelf} />
    </div>
  );
}

export default Home;