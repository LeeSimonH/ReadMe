import { useState, useEffect } from 'react';
import './Search.css';

import { googleBookSearch } from '../../services/google';

import SearchBar from './SearchBar/SearchBar';
import Container from './Results/Container';

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [showingResults, setShowingResults] = useState(false);

  function handleSearch(text) {
    setShowingResults(false);
    setSearchResults([]);

    console.log('searching for: ', text);

    googleBookSearch(text)
      .then(bookResults => {
        console.log('setting results from search: ', bookResults);
        setSearchResults(bookResults);
        setShowingResults(true);
      })
  }

  function clearResults(e) {
    e.preventDefault();
    setSearchResults([]);
    setShowingResults(false);
  }

  return (
    <div id="search-container">
      <SearchBar
        showingResults={showingResults}
        handleSearch={handleSearch}
        clearResults={clearResults}
      />
      {showingResults && <Container results={searchResults} />}
    </div>

  )
}

export default Search;