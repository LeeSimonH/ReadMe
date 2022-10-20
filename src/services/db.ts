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
  getDocsFromCache
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
    const allBooks = [];
    allBooksSnap.forEach(doc => {
      allBooks.push(doc.data());
    })
    // returns an array of objects { bookID: string, volumeInfo: {...} }
    return allBooks;
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
    .then(res => {
      console.log('Successfully added book to user shelf. Response: ', res);
    })
    .catch(err => {
      console.log('Could not add book to user shelf. Reason: ', err);
    })
}

export async function deleteBookFromUser(bookID: string) {
  console.log(`Deleting book id ${bookID} from shelf.`)
  const currentUserID = auth.currentUser?.uid;
  const allBooksRef = collection(db, 'users', currentUserID, 'allBooks');
  const q = query(allBooksRef);
  // const bookRef = doc(db, 'users', currentUserID, 'allBooks', bookID);
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach(document => {
    if (document.data().bookID == bookID) {
      const docRef = doc(db, 'users', currentUserID, 'allBooks', document.id);
      deleteDoc(docRef).then(res => {
        console.log('Successfully deleted book from user shelf. Response: ', res);
        return true;
      }).catch(err => {
        console.log('Could not delete book from user shelf. Reason: ', err);
        return false;
      })
    }
  })
}