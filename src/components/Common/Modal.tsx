import { useState, useEffect } from 'react';

import InfoLine from './InfoLine';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function Modal({ info, toggleModal, handleDelete }) {
  const { title, subtitle, authors, averageRating, pageCount } = info;
  const [titleStr, setTitleStr] = useState('');
  const [authorStr, setAuthorStr] = useState<string | null>('');

  useEffect(() => {
    subtitle ? setTitleStr(`${title}, ${subtitle}`) : setTitleStr(title);
    authors ? setAuthorStr(authors.join(', ')) : 'N/A';
  }, [])

  function handleClick(e) {
    e.preventDefault();

    const input = prompt(`Type "yes" if you're sure you want to delete this book from your shelf.`);
    if (input?.toLowerCase() == "yes") {
      handleDelete();
    }
  }

  return (
    <div className="modal">
      <Box className="modal-container" onClick={toggleModal}>
        <Paper>
          <Stack className="modal-info">
            <InfoLine label={"Title"} info={titleStr} />
            <InfoLine label={"Author(s)"} info={authorStr} />
            <InfoLine label={"Pages"} info={pageCount} />
            <InfoLine label={"Avg. Rating"} info={averageRating} />
            {/* <Stack direction="row"> */}
            <div onClick={handleClick}>
              <a className="delete-btn" href="#" target="blank">Delete from shelf</a>
            </div>
            {/* </Stack> */}
          </Stack>
        </Paper>

      </Box>
    </div>
  )
}