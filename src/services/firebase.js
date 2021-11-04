import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, FieldValue } from '../lib/firebase';

export async function doesUserNameExist(userName) {
  const userColRef = collection(db, 'users');
  const q = query(userColRef, where('username', '==', userName));
  const result = await getDocs(q);

  return result.docs.length > 0;
}

export async function getUserByUserId(userId) {
  const q = query(collection(db, 'users'), where('userId', '==', userId));
  const result = await getDocs(q);

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}
