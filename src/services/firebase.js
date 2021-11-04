import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, FieldValue } from '../lib/firebase';

export async function doesUserNameExist(userName) {
  const userColRef = collection(db, 'users');
  const q = query(userColRef, where('username', '==', userName));
  const result = await getDocs(q);

  // return result.docs.map((user) => user.data().length > 0);
  return result.docs.length > 0;
}
