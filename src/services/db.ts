import { db, auth } from './firebase';
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp
} from 'firebase/firestore';


export async function getUserDoc(userID: string) {
  const userRef = doc(db, 'users', userID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // console.log('user snapshot: ', userSnap.data());
    return userSnap.data();
  } else {
    console.log('could not find that user');
  }
}

export async function getAllUserBooks() {
  const allBooksRef = doc(db, 'users', auth.currentUser?.uid, 'shelves', 'allBooks');
  const allBooksSnap = await getDoc(allBooksRef);

  if (allBooksSnap.exists()) {
    return allBooksSnap.data();
  } else {
    console.log("could not find the user's books");
  }
}

export async function addBookToUserShelf(shelfName: string, bookID: string) {
  console.log(`adding book ${bookID} to shelf ${shelfName}`);
  const currentUserID = auth.currentUser?.uid;
  const userRef = doc(db, 'users', currentUserID);

  // const shelfRef = doc(db, `users/${currentUserID}/shelves/${shelfName}`);
  const shelfRef = doc(db, 'users', currentUserID, 'shelves', shelfName);

  setDoc(shelfRef, { books: arrayUnion(bookID) }, { merge: true });
}