import Result from './Result';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

export default function ResultsContainer({ results }) {

  return (
    <Box id="search-results-container" sx={{ flexGrow: 1 }}>
      <Stack id="search-results" spacing={2}>
        {results.map(book => {
          return (
            <Result
              key={'result' + book.id}
              bookID={book.id}
              volumeInfo={book.volumeInfo}
            />
          )
        })}
      </Stack>
    </Box>
  )
}