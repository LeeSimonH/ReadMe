import './Shelf.css';
import { useEffect, useState } from 'react';
import Thumbnail from '../Book/Thumbnail/Thumbnail';


function Shelf({ shelf }) {
  // { docID: { bookID: string, volumeInfo: { ... } } }
  const [books, setBooks] = useState({});

  useEffect(() => {
    setBooks(shelf);
  }, [shelf])

  function mapShelfToThumbnails() {
    return Array.from(Object.entries(books)).map(entry => {
      const [docID, { bookID, volumeInfo }] = entry;
      return (
        <Thumbnail
          key={docID}
          docID={docID}
          bookID={bookID}
          volumeInfo={volumeInfo}
          onShelf={true}
        />
      )
    })
  }

  return (
    <>{mapShelfToThumbnails()}
    </>

  )
}

export default Shelf;