import { useState, useEffect } from 'react';
import { deleteDocFromUser } from '../../services/db';

import ModalThumbnail from './ModalThumbnail';
import InfoLine from '../Common/InfoLine';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: "1rem",
//   border: '0 solid transparent',
//   boxShadow: 24,
//   p: 4,
//   overflowY: "scroll"
// };

export default function BookModal({ content }) {
  const { docID, bookID, volumeInfo } = content;
  const {
    title,
    subtitle,
    authors,
    imageLinks,
    pageCount,
    averageRating,
    description
  } = volumeInfo;

  const [open, setOpen] = useState(false);
  const [authorStr, setAuthorStr] = useState<string | null>('');

  useEffect(() => {
    authors ? setAuthorStr(authors.join(', ')) : 'N/A';
  }, [])

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleDelete(e) {
    e.preventDefault();

    const input = prompt(`Type "yes" if you're sure you want to delete this book from your shelf.`);
    if (input?.toLowerCase() == "yes") {
      deleteDocFromUser(docID);
    }
  }

  return (
    <div className="modal-container" >
      <ModalThumbnail
        title={subtitle ? `${title}, ${subtitle}` : title}
        imageLinks={imageLinks}
        handleOpen={handleOpen}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="book-modal-title"
        aria-describedby="book-modal-description"
      >
        <Box className="modal-info">
          <div className="main-info">
            <Typography className="title" variant="h4" >
              {title}
            </Typography>
            {subtitle && (
              <Typography className="subtitle" variant="h5" gutterBottom>
                {subtitle}
              </Typography>
            )}
            <Typography className="author" variant="h6" gutterBottom>
              {authorStr}
            </Typography>
            <Typography className="description" variant="body2" display="block" >
              {description.length > 1000 ? description.slice(0, 1000) + ' (cont...)' : description}
            </Typography>
          </div>
          <Divider className="divider"></Divider>
          <div className="lower-info">
            <div className="supplementary-info">
              <Typography className="pages" variant="body1">
                Pages: {pageCount}
              </Typography>
              <Typography className="rating" variant="body1">
                Avg. Rating: {averageRating} / 5
              </Typography>
            </div>
            <div className="controls">
              <Typography variant="button" display="block" onClick={handleDelete}>
                <a className="delete-btn" href="#" target="blank">Delete from shelf</a>
              </Typography>
            </div>
          </div>


        </Box>
      </Modal>
    </div>
  );
}
