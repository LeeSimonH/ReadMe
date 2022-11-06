import { db, auth } from './firebase';
import {
  query,
  where,
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  getDocsFromCache,
  onSnapshot
} from 'firebase/firestore';


export async function getUserDoc(userID: string) {
  const userRef = doc(db, 'users', userID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log('could not find that user');
  }
}

export async function getAllUserBooks() {
  const allBooksRef = collection(db, 'users', auth.currentUser?.uid, 'allBooks');
  const q = query(allBooksRef);

  const allBooksSnap = await getDocs(q);

  if (allBooksSnap) {
    const allBooksMap = {};
    allBooksSnap.forEach(document => {
      allBooksMap[document.id] = document.data();
    })
    // returns a hashmap: { documentID: { bookID: ..., volumeInfo: {...} } }
    return allBooksMap;
  } else {
    console.log("could not find the user's books");
  }
}

// returns a Promise
export async function addBookToUserShelf(bookID: string, bookInfo) {
  const allUserBooksRef = collection(db, 'users', auth.currentUser?.uid, 'allBooks');
  const newBookData = { bookID, volumeInfo: bookInfo };
  // add review field
  // const newBookData = { bookID, volumeInfo: bookInfo, review: null };

  addDoc(allUserBooksRef, newBookData)
    .then(documentRef => {
      console.log(`Successfully added ${bookInfo.title} to user shelf. Returning db ID: ${documentRef.id}`);
      return documentRef.id;
    })
    .catch(err => {
      console.log('Could not add book to user shelf.');
      return err;
    })
}

export async function deleteDocFromUser(docID: string) {
  const docRef = doc(db, 'users', auth.currentUser?.uid, 'allBooks', docID);

  deleteDoc(docRef).then(res => {
    console.log('Successfully deleted book from user shelf. Response: ', res);
    return true;
  }).catch(err => {
    console.log('Could not delete book from user shelf. Reason: ', err);
    return false;
  })
}
