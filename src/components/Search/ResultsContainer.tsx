import { useContext } from 'react';
import Result from './Result';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { SearchContext } from './Search';

export default function ResultsContainer() {
  const context = useContext(SearchContext);

  function createResultItems() {
    return context.results.length > 0 ? (
      context.results.map(book => {
        return (
          <Result
            key={'result' + book.id}
            bookID={book.id}
            volumeInfo={book.volumeInfo}
          />
        )
      })
    ) : (
      <p>No matching results...</p>
    );
  }

  return (
    <Box id="search-results-container" sx={{ flexGrow: 1 }}>
      <Stack id="search-results" spacing={2}>
        {createResultItems()}
      </Stack>
    </Box>
  )
}