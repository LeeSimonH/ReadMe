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
  const currentUserID = auth.currentUser?.uid;
  const allBooksRef = collection(db, 'users', currentUserID, 'allBooks');
  const q = query(allBooksRef);
  const allBooksSnap = await getDocs(q);

  if (allBooksSnap) {
    const allBooks = [];
    allBooksSnap.forEach(doc => {
      allBooks.push(doc.data());
    })
    return allBooks;
  } else {
    console.log("could not find the user's books");
  }
}

export async function addBookToUserShelf(bookID: string, bookInfo) {
  const currentUserID = auth.currentUser?.uid;
  console.log(`adding book ${bookID} to ${currentUserID}'s allBooks collection`);

  const allUserBooksRef = collection(db, 'users', currentUserID, 'allBooks');
  const newBookData = {};
  newBookData[`${bookID}`] = bookInfo;

  addDoc(allUserBooksRef, newBookData);
}