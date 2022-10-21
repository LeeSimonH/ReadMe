import './Shelf.css';
import { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { onSnapshot, query, collection, getDocs } from 'firebase/firestore';

import { getAllUserBooks } from '../../services/db';

import Shelf from './Shelf';
import LoadingCircle from '../LoadingCircle/LoadingCircle';
// import Thumbnail from '../Book/Thumbnail/Thumbnail';

import Stack from '@mui/material/Stack';

export default function Container({ userID }) {
  // { docID: { bookID: string, volumeInfo: { ... } } }
  const [reloading, setReloading] = useState(false);
  const [shelf, setShelf] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users', userID, 'allBooks'), (snapshot) => {
      if (snapshot.size) {
        // we have something! Handle data
        setShelf({});
        setReloading(true);

        snapshot.forEach(document => {
          setShelf(prevDocs => {
            prevDocs[document.id] = document.data();
            return prevDocs;
          });
        });

        console.log(`${snapshot.size} books on your shelf: `, shelf);
        setReloading(false);
      } else {
        // snapshot is empty
        setReloading(false);
      }
    })

    return () => {
      unsubscribe();
    }
  }, [db])

  return (
    <Stack className="shelf" direction="row" spacing={2}>
      {reloading ? <LoadingCircle /> : <Shelf shelf={shelf} />}
    </Stack>
  )
}