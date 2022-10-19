import './Container.css';
import { useState, useEffect } from 'react';

import { addBookToUserShelf } from '../../services/db';

import Thumbnail from './Thumbnail/Thumbnail';
import InfoModal from './InfoModal/InfoModal';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Container({ id, volumeInfo }) {
  function addBookToShelf(e/* , shelfName:string, bookID: string */): void {
    e.preventDefault();
    const addedBook = addBookToUserShelf(id, volumeInfo);
  }

  return (
    <Stack direction="row" className="book-info-container">
      <Box className="book-container">
        <Thumbnail title={volumeInfo.title} imageLinks={volumeInfo.imageLinks} onShelf={false} />
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