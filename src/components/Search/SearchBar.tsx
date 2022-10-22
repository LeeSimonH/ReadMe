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
    <form className="search-bar-container" onSubmit={onSubmit}>
      <FormControl className="form-ctrl">
        <TextField
          id="search-text-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          label="Search for books"
          variant="filled"
          autoComplete='off'
          InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton className="icon-btn" type="submit">
                <SearchIcon className="icon" />
              </IconButton>
            </InputAdornment>
          }}
        />
      </FormControl>
      {showingResults &&
        <Button
          id="clear-results-btn"
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