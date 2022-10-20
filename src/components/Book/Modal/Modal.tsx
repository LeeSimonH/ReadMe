import './Modal.css';
import { useState, useEffect } from 'react';
import { deleteBookFromUser } from '../../../services/db';

import InfoLine from './InfoLine';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

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
    <>
      <Box className="modal" onClick={toggleModal}>
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
      </Box>
    </>
  )
}