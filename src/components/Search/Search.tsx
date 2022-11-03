import { useState, useEffect } from 'react';
import './../../assets/sass/search.scss';

import { googleBookSearch } from '../../services/google';
import { getTotalPages, getPaginationNumbers } from '../../utils/pagination';

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
  const [currPageNum, setCurrPageNum] = useState<number>(1);
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

  function getPage(pageNum: number) {
    setShowingResults(false);
    const startIndex = (pageNum - 1) * itemsPerPage;
    if (startIndex >= 0) {
      setCurrPageNum(pageNum);
      googleBookSearch(searchText, startIndex, itemsPerPage)
        .then(data => {
          handleGoogleSearchData(data);
          setShowingResults(true);
        })
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    // setShowingResults(false);

    console.log('searching for: ', searchText);
    getPage(1);
  }

  function clearResults(e) {
    e.preventDefault();
    setPage([]);
    setCurrPageNum(0);
    setShowingResults(false);
    setSearchText('');
  }

  function Pagination() {
    function PageNumberButton({ pageNum }) {
      return (
        <button
          className="page-number-btn"
          onClick={() => getPage(pageNum)}
        >{pageNum}</button>
      )
    }

    const paginationNumbers = getPaginationNumbers(currPageNum, totalBookMatches, itemsPerPage);

    return (
      <div className="page-numbers-container">
        {paginationNumbers.map(pageNum => {
          if (pageNum == '...') {
            return <span>{'...'}</span>;
          } else {
            return <PageNumberButton pageNum={pageNum} />
          }
        })}
      </div>
    )
  }

  return (
    <div id="search-container">

      <div className="search-controls-container">
        <div className="pagination">
          <div className="page-buttons-container">
            <Button className="prev-page-btn"
              onClick={() => getPage(currPageNum - 1)}
            > {'< Prev'}</Button>

            <Button className="next-page-btn"
              onClick={() => getPage(currPageNum + 1)}
            >{'Next >'}</Button>
          </div>
          <Pagination />
        </div>
      </div>

      <div className="search-bar-container" >
        <form
          // className="search-bar-container"
          onSubmit={handleSearch}
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