import './Shelf.css';
import { useState, useEffect } from 'react';

import { singleBookSearch } from '../../services/google';

import Book from './../Book/Book';

import Button from '@mui/material/Button';

function Shelf({ bookIDs }) {
  const [displayBooks, setDisplayBooks] = useState<Array<JSX.Element>>([]);

  useEffect(() => {
    if (bookIDs) {
      // query GoogleBooks API for each ID
      // TO-DO: cache API responses
      bookIDs.forEach(bookID => {
        singleBookSearch(bookID).then(bookData => {
          const { id, volumeInfo } = bookData;
          setDisplayBooks(prevBooks => [...prevBooks, <Book id={id} volumeInfo={volumeInfo} />])
        })
      })
      // return <Book id = { id } volumeInfo = { volumeInfo } />
    }

  }, []);

  return (
    <div className="shelf">
      {displayBooks}
    </div>
  )
}

export default Shelf;