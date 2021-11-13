import PropTypes from 'prop-types';
import { useReducer } from 'react';
import Header from '../Header';

const reducer = (state, newState) => ({ ...state, ...newState });
const initialState = {
  profile: {},
  photosCollection: [],
  followercount: 0,
};

function UserProfile() {
  const [{ profile, photosCollection, followercount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return <div></div>;
}

export { UserProfile };
