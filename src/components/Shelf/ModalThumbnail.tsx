import { useState, useEffect } from 'react';

export default function ModalThumbnail({ title, imageLinks, handleOpen }) {
  const [link, setLink] = useState('#');

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

  return (
    <div
      className="book-thumbnail"
      onClick={handleOpen}
    >
      <img
        alt={title}
        src={link}
      />
    </div>

  )
}