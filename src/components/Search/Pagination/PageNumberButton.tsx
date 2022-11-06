import { useContext } from 'react';

import { SearchContext } from '../Search';

export default function PageNumberButton({ pageNum }) {
  const context = useContext(SearchContext);

  function handleGetPage() {
    context.getPage(pageNum);
  }

  return (
    <button
      className="page-number-btn"
      onClick={handleGetPage}
    >{pageNum}</button>
  )
}