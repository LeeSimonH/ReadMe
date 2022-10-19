import './Shelf.css';
import { useState, useEffect } from 'react';

import Thumbnail from '../Book/Thumbnail/Thumbnail';

import Stack from '@mui/material/Stack';

function Shelf({ books }) {
  const [thumbnailsInfo, setThumbnailsInfo] = useState([]);

  useEffect(() => {
    if (books) {
      (books).forEach((book) => {
        const id = Object.keys(book)[0];
        const { title, imageLinks } = book[id];
        // const { id: { title, imageLinks } } = book;
        setThumbnailsInfo(prevInfo => [...prevInfo, { id, title, imageLinks }])
      })
    }

    return () => {
      setThumbnailsInfo([])
    }
  }, []);

  return (
    <Stack className="shelf" direction="row" spacing={2}>
      {thumbnailsInfo.map(thumbnailInfo => {
        const { id, title, imageLinks } = thumbnailInfo;
        return <Thumbnail key={id} title={title} imageLinks={imageLinks} onShelf={true} />
      })}
    </Stack>
  )
}

export default Shelf;