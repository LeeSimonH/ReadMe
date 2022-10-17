import { useState, useEffect } from 'react';
import { VolumeInfo } from '../../types/types';

import Grid from '@mui/material/Grid';

function BookResult({ id, volumeInfo }) {
  const { title, authors, averageRating, pageCount } = volumeInfo;

  return (
    <Grid className="search-result-book" item xs={4}>
      <span>Title: {title}</span>
      <span>Authors: {authors}</span>
      <span>Avg. Rating: {averageRating}</span>
      <span>Pages: {pageCount}</span>
    </Grid>
  )
}

function SearchResults({ results }) {
  const resultsDisplay = [];
  useEffect(() => {
    for (const book of results) {
      resultsDisplay.push(BookResult(book));
    }
  }, [])

  return (
    <div>
      <Grid container spacing={2}>
        {resultsDisplay}
      </Grid>
    </div>
  )
}

export default SearchResults;