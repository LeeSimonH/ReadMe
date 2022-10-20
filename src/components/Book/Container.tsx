import './Container.css';
import { useState, useEffect } from 'react';

import { addBookToUserShelf } from '../../services/db';

import Thumbnail from './Thumbnail/Thumbnail';
import Modal from './Modal/Modal';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Container({ bookID, volumeInfo }) {
  const { title, subtitle, authors, pageCount, averageRating } = volumeInfo;

  function addBookToShelf(e/* , shelfName:string, bookID: string */): void {
    e.preventDefault();
    const addedBook = addBookToUserShelf(bookID, volumeInfo);
    console.log('added book: ', addedBook);
  }

  return (
    <Stack direction="row" className="book-info-container">
      <Box className="book-container">
        <Thumbnail bookID={bookID} info={volumeInfo} onShelf={false} />
      </Box>
      <Stack className="book-info">
        <span><strong>Title:</strong> {subtitle ? `${title}, ${subtitle}` : title}</span>
        <span><strong>Author(s):</strong> {authors ? authors.join(', ') : 'N/A'}</span>
        <span><strong>Pages:</strong> {pageCount ? pageCount : 'N/A'}</span>
        <span><strong>Avg. Rating:</strong> {averageRating ? `${averageRating}/5` : 'N/A'}</span>
      </Stack>
      <Button
        className="add-to-shelf-btn"
        variant="outlined"
        onClick={addBookToShelf}
      >Add Book</Button>
    </Stack>
  )
}