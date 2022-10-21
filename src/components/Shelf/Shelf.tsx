import { useEffect, useState } from 'react';
import Thumbnail from '../Book/Thumbnail';
import BookModal from './BookModal';

function Shelf({ shelf }) {
  // { docID: { bookID: string, volumeInfo: { ... } } }
  const [books, setBooks] = useState({});

  useEffect(() => {
    setBooks(shelf);
  }, [shelf])

  function mapShelfToThumbnails() {
    return Array.from(Object.entries(books)).map(entry => {
      const [docID, { bookID, volumeInfo }] = entry;
      const modalContent = { docID, bookID, volumeInfo };
      return (
        <div className="shelf-tile" key={docID}>
          {/* <Thumbnail
            docID={docID}
            bookID={bookID}
            volumeInfo={volumeInfo}
          /> */}
          <BookModal content={modalContent} />
        </div>
      )
    })
  }

  return (
    <div className="shelf">
      {mapShelfToThumbnails()}
    </div>
  )
}

export default Shelf;