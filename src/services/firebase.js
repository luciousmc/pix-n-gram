import { collection, getDocs, limit, query, where } from 'firebase/firestore';
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

export async function getSuggestedProfiles(userId, following) {
  const q = query(collection(db, 'users'), limit(10));
  const result = await getDocs(q);

  return result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );
}
