import React, { useState, useEffect } from 'react';
import './NewBookForm.css'

import { BookProps } from '../types/types';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { FormHelperText, Input, InputLabel } from '@mui/material';

function NewBookForm({ onSubmit }): JSX.Element {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim().length > 0 && author.trim().length > 0) {
      console.log('title: ', title);
      console.log('author: ', author);

      const formData: BookProps = {
        title, author
      };

      onSubmit(formData);

      setTitle('');
      setAuthor('');

    } else {
      console.log('invalid title or author');
    }
  }

  return (
    <form id="new-book-form" onSubmit={handleSubmit}>
      <FormControl>
        <InputLabel htmlFor="title">Book Title:</InputLabel>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} aria-describedby='title-helper-text' />
        <FormHelperText id="title-helper-text">the title of the book</FormHelperText>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="author">Author:</InputLabel>
        <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} aria-describedby='author-helper-text' />
        <FormHelperText id="author-helper-text">the book's author</FormHelperText>
      </FormControl>
      <Button type="submit" variant="contained">Submit</Button>
    </form>
  )
}

export default NewBookForm;