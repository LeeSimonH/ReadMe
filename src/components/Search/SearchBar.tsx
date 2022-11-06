import { useState, useContext, useRef, useEffect } from 'react';

import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { SearchContext } from './Search';

export default function SearchBar({ handleSearch }) {
  const inputRef = useRef(null);
  const context = useContext(SearchContext);

  function handleSubmit(e) {
    e.preventDefault();
    handleSearch();
  }

  function handleInputChange(e) {
    context.setSearchText(e.currentTarget.value);
  }

  return (
    <div className="search-bar-container" >
      <form onSubmit={handleSubmit}>
        <FormControl className="form-ctrl">
          <TextField
            id="search-text-input"
            onChange={handleInputChange}
            ref={inputRef}

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
      </form>
    </div>
  )

}