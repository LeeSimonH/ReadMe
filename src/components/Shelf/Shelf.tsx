import './Shelf.css';
import { useState, useEffect } from 'react';

import Thumbnail from '../Book/Thumbnail/Thumbnail';

import Stack from '@mui/material/Stack';

function Shelf({ books }) {
  const [thumbnailsInfo, setThumbnailsInfo] = useState([]);

  useEffect(() => {
    if (books) {
      (books).forEach((book) => {
        const bookID = book.bookID
        const bookInfo = book.volumeInfo;
        // const { id: { title, imageLinks } } = book;
        setThumbnailsInfo(prevInfo => [...prevInfo, { bookID, bookInfo }])
      })
    }

    return () => {
      setThumbnailsInfo([])
    }
  }, []);

  return (
    <Stack className="shelf" direction="row" spacing={2}>
      {thumbnailsInfo.map(thumbnailInfo => {
        const { bookID, bookInfo } = thumbnailInfo;
        return <Thumbnail key={bookID} bookID={bookID} info={bookInfo} onShelf={true} />
      })}
    </Stack>
  )
}

export default Shelf;