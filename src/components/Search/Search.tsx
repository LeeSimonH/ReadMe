import { useState, useEffect } from 'react';
import './../../assets/sass/search.scss';

import { googleBookSearch } from '../../services/google';

// import SearchBar from './SearchBar';
import Container from './Container';

// search bar components
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// general components
import Button from '@mui/material/Button';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [totalBookMatches, setTotalBookMatches] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // max allowable in one response is 40

  const [page, setPage] = useState([]); // array of google book objects
  const [showingResults, setShowingResults] = useState<boolean>(false);

  function handleGoogleSearchData(data) {
    setPage([]);

    const { items, totalItems } = data;
    if (totalItems) {
      console.log('total books that match search: ', totalItems);
      setTotalBookMatches(totalItems);
    }
    if (items) {
      console.log('setting results from search: ', items);
      setPage(items);
    }
  }

  function handleSearch() {
    setShowingResults(false);

    console.log('searching for: ', searchText);

    const startIdx = (pageNum - 1) * itemsPerPage;

    googleBookSearch(searchText, startIdx, itemsPerPage)
      .then(data => {
        handleGoogleSearchData(data);
        setShowingResults(true);
      })
  }

  function clearResults(e) {
    e.preventDefault();
    setPage([]);
    setPageNum(0);
    setShowingResults(false);
    setSearchText('');
  }

  function getNextPage() {
    const nextStartIdx = pageNum * itemsPerPage;
    if (nextStartIdx <= totalBookMatches - 1) {
      setPageNum(prev => prev + 1);
      googleBookSearch(searchText, nextStartIdx, itemsPerPage)
        .then(data => {
          handleGoogleSearchData(data);
        })
    }
  }

  function getPrevPage() {
    const prevStartIndex = (pageNum - 2) * itemsPerPage;
    if (prevStartIndex >= 0) {
      setPageNum(prev => prev - 1);
      googleBookSearch(searchText, prevStartIndex, itemsPerPage)
        .then(data => {
          handleGoogleSearchData(data);
        })
    }
  }

  return (
    <div id="search-container">

      <div className="search-controls-container">
        <div className="pagination">
          <div className="page-buttons-container">
            {/* <Button className="first-page-btn">{'<< First'}</Button> */}
            <Button
              className="prev-page-btn"
              onClick={getPrevPage}
            >
              {'< Prev'}
            </Button>
            <Button
              className="next-page-btn"
              onClick={getNextPage}
            >
              {'Next >'}
            </Button>
            {/* <Button className="last-page-btn">{'Last >>'}</Button> */}
          </div>
          <div className="page-number-buttons-container">
            <div>Current Page: {pageNum}</div>
            {/* <Button>{'1'}</Button>
            <Button>{'2'}</Button>
            <Button>{'...'}</Button> */}
          </div>
        </div>
      </div>

      <div className="search-bar-container" >
        {/* <SearchBar
          showingResults={showingResults}
          handleSearch={handleSearch}
        /> */}

        <form
          className="search-bar-container"
          onSubmit={e => {
            e.preventDefault();
            handleSearch();
          }}
        >
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
        </form>

        {showingResults &&
          <Button id="clear-results-btn" variant="text" onClick={clearResults}>
            Clear Results
          </Button>
        }
      </div>

      {showingResults && <Container results={page} />}
    </div>

  )
}