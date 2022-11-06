import { useContext } from 'react';

import Button from '@mui/material/Button';

import PaginationNumbers from './PaginationNumbers';

import { SearchContext } from '../Search';

export default function Pagination() {
  const context = useContext(SearchContext);

  function handleClear(e) {
    e.preventDefault();

    context.setResults([]);
    context.setPageNum(0);
    context.setSearchText('');
  }

  function handleNext() {
    context.getPage(context.currPageNum + 1)
  }

  function handlePrev() {
    context.getPage(context.currPageNum - 1)
  }

  return (
    <div className="pagination">
      <div className="page-buttons-container">
        <Button className="prev-page-btn"
          onClick={handlePrev}
        >❮</Button>

        <PaginationNumbers />

        <Button className="next-page-btn"
          onClick={handleNext}
        >❯</Button>
      </div>
      <Button id="clear-results-btn" variant="text" onClick={handleClear}>
        Clear Results
      </Button>
    </div>
  )
}