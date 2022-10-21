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
    // console.log('user snapshot: ', userSnap.data());
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

export async function addBookToUserShelf(bookID: string, bookInfo) {
  const currentUserID = auth.currentUser?.uid;
  console.log(`adding book ${bookID} to ${currentUserID}'s allBooks collection`);

  const allUserBooksRef = collection(db, 'users', auth.currentUser?.uid, 'allBooks');

  const newBookData = { bookID, volumeInfo: bookInfo };

  addDoc(allUserBooksRef, newBookData)
    .then(documentRef => {
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
