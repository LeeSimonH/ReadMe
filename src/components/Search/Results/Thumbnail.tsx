import { useState, useEffect } from 'react';

export default function Thumbnail({ bookID, volumeInfo }) {
  const [link, setLink] = useState('#');

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

  return (
    <div className="result book-thumbnail">
      <img
        alt={title}
        src={link}
      />
    </div>
  )
}