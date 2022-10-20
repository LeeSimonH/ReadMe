import './Shelf.css';
import { useState, useEffect } from 'react';

import { getAllUserBooks } from '../../services/db';

import Thumbnail from '../Book/Thumbnail/Thumbnail';

import Stack from '@mui/material/Stack';

function Shelf({ userID }) {
  // { docID: { bookID: string, volumeInfo: { ... } } }
  const [bookDocs, setBookDocs] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    getAllUserBooks()
      .then(bookCollection => {
        console.log('user books retrieved: ', bookCollection);
        setBookDocs(bookCollection);
        // Object.entries(bookCollection).forEach((docID, {bookID, volumeInfo}) => {
        //   setBooks(prevBooks => [...prevBooks, {docID, bookID, volumeInfo}]);
        // })
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (bookDocs) {
      for (const [docID, book] of Object.entries(bookDocs)) {
        const { bookID, volumeInfo } = book;
        setThumbnails(prevInfo => [...prevInfo, { docID, bookID, volumeInfo }]);
      }
    }

    return () => {
      setThumbnails([])
    }
  }, [bookDocs]);

  function updateShelf() {

  }

  return (
    <Stack className="shelf" direction="row" spacing={2}>
      {thumbnails.map(thumbnail => {
        const { docID, bookID, volumeInfo } = thumbnail;
        return (
          <Thumbnail
            key={docID}
            docID={docID}
            bookID={bookID}
            volumeInfo={volumeInfo}
            onShelf={true}
          />
        )
      })}
    </Stack>
  )
}

export default Shelf;