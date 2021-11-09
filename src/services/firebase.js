import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export async function doesUserNameExist(userName) {
  const userColRef = collection(db, 'users');
  const q = query(userColRef, where('username', '==', userName));
  const result = await getDocs(q);

  return result.docs.length > 0;
}

/**
 * Queries Firebase for user Data based on provided user Id
 * @param {string} userId - Id of the user to get dat for
 * @returns User Object
 */
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

  const profiles = result.docs
    .map((user) => ({
      ...user.data(),
      docId: user.id,
    }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following.includes(profile.userId)
    );

  return profiles;
}

export async function updateLoggedUserFollowing(
  userId,
  profileId,
  isFollowingProfile
) {
  const q = query(collection(db, 'users'), where('userId', '==', userId));
  const result = await getDocs(q);

  await updateDoc(doc(db, 'users', result.docs[0].id), {
    following: isFollowingProfile
      ? arrayRemove(profileId)
      : arrayUnion(profileId),
  });
}

export async function updateFollowedUserFollwers(userDocId, userId) {
  await updateDoc(doc(db, 'users', userDocId), {
    followers: isFollowingProfile ? arrayRemove(userId) : arrayUnion(userId),
  });
}

export async function getPhotos(userId, following) {
  const q = query(collection(db, 'photos'), where('userId', 'in', following));
  const result = await getDocs(q);

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;

      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);
      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photosWithUserDetails;
}
