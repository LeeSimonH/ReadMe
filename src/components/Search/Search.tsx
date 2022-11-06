import React, { useState, useEffect } from 'react';
import './../../assets/sass/search.scss';

import { googleBookSearch } from '../../services/google';

import SearchBar from './SearchBar';
import Pagination from './Pagination/Pagination';
import ResultsContainer from './ResultsContainer';

// context
export const SearchContext = React.createContext();

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [page, setPage] = useState([]); // array of google book objects
  const [showingResults, setShowingResults] = useState<boolean>(false);

  const [currPageNum, setCurrPageNum] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // max allowable in one response is 40
  const [totalBookMatches, setTotalBookMatches] = useState<number>(0);

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

  function handleSearch() {
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

  return (
    <div id="search-container">
      <SearchContext.Provider
        value={{
          results: searchResults,
          setSearchText: setSearchText,
          setResults: setPage,

          currPageNum: currPageNum,
          setPageNum: setCurrPageNum,

          itemsPerPage: itemsPerPage,
          totalBookMatches: totalBookMatches,

          getPage: getPage,

          clearResults: clearResults,
        }}
      >
        <div className="search-controls-container">
          <SearchBar handleSearch={handleSearch} />

          {showingResults && <Pagination />}
        </div>

        {showingResults && <ResultsContainer results={page} />}

      </SearchContext.Provider>
    </div>
  )
}