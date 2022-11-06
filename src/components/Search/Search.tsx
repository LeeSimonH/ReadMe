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

  const [currPageNum, setCurrPageNum] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // max allowable in one response is 40
  const [totalBookMatches, setTotalBookMatches] = useState<number>(0);

  function handleGoogleSearchData(data) {
    setSearchResults([]);

    const { items, totalItems } = data;
    if (totalItems) {
      console.log('total books that match search: ', totalItems);
      setTotalBookMatches(totalItems);
    }
    if (items) {
      console.log('setting results from search: ', items);
      setSearchResults(items);
    }
  }

  function getPage(pageNum: number) {
    const startIndex = (pageNum - 1) * itemsPerPage;
    if (startIndex >= 0) {
      setCurrPageNum(pageNum);
      googleBookSearch(searchText, startIndex, itemsPerPage)
        .then(data => {
          handleGoogleSearchData(data);
        })
    }
  }

  function handleSearch() {
    console.log('searching for: ', searchText);
    getPage(1);
  }

  return (
    <div id="search-container">
      <SearchContext.Provider
        value={{
          setSearchText: setSearchText,
          results: searchResults,
          setResults: setSearchResults,

          currPageNum: currPageNum,
          setPageNum: setCurrPageNum,
          itemsPerPage: itemsPerPage,
          setItemsPerPage: setItemsPerPage,
          totalBookMatches: totalBookMatches,

          getPage: getPage,
        }}
      >

        <div className="search-controls-container">
          <SearchBar handleSearch={handleSearch} />
          {searchResults.length > 0 && <Pagination />}
        </div>

        <ResultsContainer />

      </SearchContext.Provider>
    </div>
  )
}