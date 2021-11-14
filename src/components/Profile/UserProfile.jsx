import PropTypes from 'prop-types';
import { useEffect, useReducer } from 'react';
import { getUserPhotosByUserId } from '../../services/firebase';
import Photos from './Photos';
import UserProfileHeader from './UserProfileHeader';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followerCount: 0,
};

function UserProfile({ user }) {
  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const getProfilePhotos = async () => {
      const photos = await getUserPhotosByUserId(user.userId);

      dispatch({
        profile: user,
        photosCollection: photos,
        followerCount: user.followers.length,
      });
    };
    getProfilePhotos();
  }, [user.userId]);

  return (
    <>
      <UserProfileHeader />
      <Photos photos={photosCollection} />
      <p>Hello {user.username}</p>
    </>
  );
}

export { UserProfile };

UserProfile.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    dateCreated: PropTypes.object.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
};