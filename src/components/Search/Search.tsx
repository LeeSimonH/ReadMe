import { useState, useEffect } from 'react';
import './Search.css';
import axios from 'axios';

import Book from '../Book/Book';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const baseURL = 'https://www.googleapis.com/books/v1/volumes';

function SearchResults({ results }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setSearchResults(results.map(book => {
      return (
        <Book id={book.id} volumeInfo={book.volumeInfo} />
      )
    }));
  }, [])

  return (
    <Box id="search-results-container" sx={{ flexGrow: 1 }}>
      <Stack id="search-results" spacing={2}>
        {searchResults}
      </Stack>
    </Box>
  )
}

function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showingResults, setShowingResults] = useState(false);

  async function googleBookSearch(text: string) {
    setShowingResults(false);
    setSearchResults([]);

    const { data: { items } } = await axios.get(baseURL + `?q=${text}`);
    const bookResults = items;
    console.log('GBooks search book results: ', bookResults);

    setSearchResults(bookResults);
    setShowingResults(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    googleBookSearch(searchText);
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
        {showingResults &&
          <Button
            variant="text"
            onClick={(e) => {
              e.preventDefault();
              setSearchResults([]);
              setSearchText('');
              setShowingResults(false);
            }}
          >
            Clear Results
          </Button>
        }
      </form>
      {showingResults && <SearchResults results={searchResults} />}

    </div>

  )
}

export default Search;