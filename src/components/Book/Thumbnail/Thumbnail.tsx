import './Thumbnail.css';
import { useState, useEffect } from 'react';
import { deleteBookFromUser } from '../../../services/db';

import Modal from '../Modal/Modal';

export default function Thumbnail({ bookID, info, onShelf }) {
  const [link, setLink] = useState('#');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { title, imageLinks } = info;

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
    deleteBookFromUser(bookID);
  }

  return (
    <>
      <div
        className={onShelf ? "thumbnail on-shelf" : "thumbnail"}
        onClick={toggleModal}
      >
        <img
          alt={title}
          src={link}
        />
      </div>
      {showModal ? <Modal info={info} toggleModal={toggleModal} handleDelete={handleDelete} /> : null}
    </>

  )
}