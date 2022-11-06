import { useContext } from 'react';
import PageNumberButton from "./PageNumberButton";

import { getPaginationNumbers } from "../../../utils/pagination";

import { SearchContext } from '../Search';

export default function PaginationNumbers() {
  const context = useContext(SearchContext);
  const paginationNumbers = getPaginationNumbers(context.currPageNum, context.totalBookMatches, context.itemsPerPage);

  return (
    <div className="page-numbers-container">
      {paginationNumbers.map(pageNum => {
        if (pageNum == '...') {
          return <span>{'...'}</span>;
        } else {
          return <PageNumberButton key={pageNum} pageNum={pageNum} />
        }
      })}
    </div>
  )
}