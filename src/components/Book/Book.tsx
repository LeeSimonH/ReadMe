import './Book.css';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function BookModal({ volumeInfo }) {
  const { title, authors, } = volumeInfo;

  return (
    <Stack className="book-info modal" onClick={handleClick}>
      <span>Title: {title}</span>
      <span>Authors: {authors.join(', ')}</span>
      <span>Avg. Rating: {averageRating}</span>
      <span>Pages: {pageCount}</span>
    </Stack>
  )
}

function Book({ id, volumeInfo }) {
  const { title, subtitle, authors, averageRating, pageCount, imageLinks } = volumeInfo;

  const [open, setOpen] = useState(false);
  const [link, setLink] = useState('#')

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
    <>
      {!open ? (
        <Stack direction="row" className="book-info-container">
          <Box className="book-container">
            <div className="book">
              <img
                alt={title}
                src={link}
              />
            </div>
          </Box>
          <Stack className="book-info">
            <span><strong>Title:</strong> {subtitle ? title : `${title}, ${subtitle}`}</span>
            <span><strong>Author(s):</strong> {authors.join(', ')}</span>
            <span><strong>Pages:</strong> {pageCount ? pageCount : 'N/A'}</span>
            {/* <span><strong>Avg. Rating:</strong> {averageRating}</span> */}
          </Stack>
          <Button
            className="add-to-shelf-btn"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
            }}
          >Add Book</Button>
        </Stack>
      ) : (
        <BookModal volumeInfo={volumeInfo} />
      )}
    </>

  )
}

export default Book;