import './Book.css';
import { useState, useEffect } from 'react';

import { addBookToUserShelf } from '../../services/db';

import InfoModal from './InfoModal/InfoModal';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function Book({ id, volumeInfo }) {
  const { title, imageLinks } = volumeInfo;
  const [link, setLink] = useState('#');

  function addBookToShelf(e/* , shelfName:string, bookID: string */): void {
    e.preventDefault();
    addBookToUserShelf('allBooks', id);
  }

  useEffect(() => {
    if (imageLinks) {
      if (imageLinks.hasOwnProperty("thumbnail")) {
        setLink(imageLinks.thumbnail);
      } else if (imageLinks.hasOwnProperty("smallThumbnail")) {
        setLink(imageLinks.smallThumbnail);
      }
    } else {
      setLink("https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg");
    }
  }, [])


  return (
    <Stack direction="row" className="book-info-container">
      <Box className="book-container">
        <div className="book">
          <img
            alt={title}
            src={link}
          />
        </div>
      </Box>
      <InfoModal volumeInfo={volumeInfo} isModal={false} />
      <Button
        className="add-to-shelf-btn"
        variant="outlined"
        onClick={addBookToShelf}
      >Add Book</Button>
    </Stack>
  )
}

export default Book;