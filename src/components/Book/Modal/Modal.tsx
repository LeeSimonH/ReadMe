import './Modal.css';
// import { useState, useEffect } from 'react';
import { deleteBookFromUser } from '../../../services/db';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Modal({ info, toggleModal, handleDelete }) {
  const { title, subtitle, authors, averageRating, pageCount } = info;

  function handleClick(e) {
    e.preventDefault();

    const input = prompt(`Type "yes" if you're sure you want to delete this book from your shelf.`);
    if (input?.toLowerCase() == "yes") {
      handleDelete();
    }
  }

  return (
    <>
      <Box className="modal" onClick={toggleModal}>
        <Stack className="modal-info">
          <span><strong>Title:</strong> {subtitle ? `${title}, ${subtitle}` : title}</span>
          <span><strong>Author(s):</strong> {authors ? authors.join(', ') : 'N/A'}</span>
          <span><strong>Pages:</strong> {pageCount ? pageCount : 'N/A'}</span>
          <span><strong>Avg. Rating:</strong> {averageRating ? `${averageRating}/5` : 'N/A'}</span>
          <Stack>
            <Button
              className="delete-btn"
              variant="text"
              onClick={handleClick}
            >
              Delete from shelf
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}