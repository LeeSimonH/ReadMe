import { useState } from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({
  showingResults,
  handleSearch,
  clearResults
}) {
  const [searchText, setSearchText] = useState('');

  function onSubmit(e) {
    e.preventDefault();
    handleSearch(searchText);
  }

  return (
    <form id="search-bar" onSubmit={onSubmit}>
      <FormControl>
        <TextField
          id="search-text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
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
          onClick={e => {
            clearResults(e);
            setSearchText('');
          }}
        >
          Clear Results
        </Button>
      }
    </form>
  )

}