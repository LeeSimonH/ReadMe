import { db } from './firebase';
import { collection, doc, getDoc } from 'firebase/firestore';

const usersRef = collection(db, 'user');

export async function getUserDoc(userID) {
  const userRef = doc(db, 'users', userID);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // console.log('user snapshot: ', userSnap.data());
    return userSnap.data();
  } else {
    console.log('could not find that user');
    return false;
  }
}