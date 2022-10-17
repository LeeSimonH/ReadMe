import { useState, useEffect } from 'react';
import './Search.css';

// import SearchResults from '../SearchResults/SearchResults';
// import { VolumeInfo } from './../../types/types';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

async function googleBookSearch(searchText: string) {
  const baseURL = 'https://www.googleapis.com/books/v1/volumes';

  // max results allowable is 40
  // const requestParams = {
  //   q: searchText,
  //   startIndex: 0,
  //   maxResults: 20
  // };

  const results = await fetch(baseURL + `?q=${searchText}`)
    .then(response => response.json())
    .then(data => {
      return data.items;
    })
    .catch(err => console.log('There was an error with your search.', err))

  return results;
}


function BookResult({ id, volumeInfo }) {
  console.log('adding book info: ', volumeInfo);
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

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid id="search-results" container spacing={2}>
        {results ? results.map(book => {
          <BookResult key={book.id} id={book.id} volumeInfo={book.volumeInfo} />
        }) : null}
      </Grid>
    </Box>

  )
}

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showingResults, setShowingResults] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const results = await googleBookSearch(searchText);
    console.log(results);
    setSearchResults(results);
    setTimeout(() => {
      console.log('your search results: ', searchResults);
      setShowingResults(true);
      setSearchText('');
    }, 2000)
  }

  return (
    <div id="search-container">
      <form id="search" onSubmit={e => handleSubmit(e)}>
        <FormControl>
          <TextField
            id="search-text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            label="Search for books"
            variant="filled"
            autoComplete='off'
            InputProps={{
              endAdornment: <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }}
          />
        </FormControl>
      </form>
      {showingResults ? <SearchResults results={searchResults} /> : 'Nothing to show yet...'}

    </div>

  )
}

export default Search;