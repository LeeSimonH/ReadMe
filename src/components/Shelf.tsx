import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

import Book from '../components/Book';
import { BookProps } from '../types/types';

function Shelf({ books }) {
  const [displayBooks, setDisplayBooks] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    setDisplayBooks(books.map((book: BookProps) => {
      return <Book title={book.title} author={book.author} />
    }))
  }, [books]);

  return (
    <div className="shelf">
      {displayBooks}
    </div>
  )
}

export default Shelf;