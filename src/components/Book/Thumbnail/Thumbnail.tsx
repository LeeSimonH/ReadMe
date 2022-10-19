import './Thumbnail.css';
import { useState, useEffect } from 'react';

export default function Thumbnail({ title, imageLinks, onShelf }) {
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
    <div className={onShelf ? "book on-shelf" : "book"}>
      <img
        alt={title}
        src={link}
      />
    </div>
  )
}