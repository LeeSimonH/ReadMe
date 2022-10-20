import './Thumbnail.css';
import { useState, useEffect } from 'react';
import { deleteDocFromUser } from '../../../services/db';

import Modal from '../Modal/Modal';

export default function Thumbnail({ docID, bookID, volumeInfo, onShelf }) {
  const [link, setLink] = useState('#');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { title, imageLinks } = volumeInfo;

  useEffect(() => {
    if (imageLinks) {
      if (imageLinks.hasOwnProperty("thumbnail")) {
        setLink(imageLinks.thumbnail);
      } else if (imageLinks.hasOwnProperty("smallThumbnail")) {
        setLink(imageLinks.smallThumbnail);
      }
    } else {
      setLink("https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg");
    }
  }, [])

  function toggleModal() {
    setShowModal(prev => !prev);
  }

  function handleDelete() {
    deleteDocFromUser(docID);
  }

  return (
    <>
      <div
        className={onShelf ? "thumbnail on-shelf" : "thumbnail"}
        onClick={onShelf ? toggleModal : () => { }}
      >
        <img
          alt={title}
          src={link}
        />
      </div>
      {showModal ? <Modal info={volumeInfo} toggleModal={toggleModal} handleDelete={handleDelete} /> : null}
    </>

  )
}