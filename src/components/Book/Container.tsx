import './Container.css';
import { useState, useEffect } from 'react';

import { addBookToUserShelf } from '../../services/db';

import Thumbnail from './Thumbnail/Thumbnail';
import InfoLine from './Modal/InfoLine';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Container({ bookID, volumeInfo }) {
  const { title, subtitle, authors, pageCount, averageRating } = volumeInfo;
  const [titleStr, setTitleStr] = useState('');
  const [authorStr, setAuthorStr] = useState<string | null>('');

  useEffect(() => {
    subtitle ? setTitleStr(`${title}, ${subtitle}`) : setTitleStr(title);
    authors ? setAuthorStr(authors.join(', ')) : 'N/A';
  }, [])

  async function addBookToShelf(e/* , shelfName:string, bookID: string */): void {
    e.preventDefault();
    addBookToUserShelf(bookID, volumeInfo)
      .then(addDocId => {
        console.log('added book, document ID: ', addedDocId);
      })
  }

  return (
    <Paper elevation={3}>
      <div className="book-info-container">
        <Box className="book-container">
          <Thumbnail bookID={bookID} info={volumeInfo} onShelf={false} />
        </Box>
        <Stack className="book-info">
          <InfoLine label={"Title"} info={titleStr} />
          <InfoLine label={"Author(s)"} info={authorStr} />
          <InfoLine label={"Pages"} info={pageCount} />
          <InfoLine label={"Avg. Rating"} info={averageRating} />
        </Stack>
        <Button
          className="add-to-shelf-btn"
          variant="outlined"
          onClick={addBookToShelf}
        >Add Book</Button>
      </div>
    </Paper>

  )
}