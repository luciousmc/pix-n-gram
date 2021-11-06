import { UserCircleIcon } from '@heroicons/react/solid';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { addFollower, addFollowing } from '../../services/firebase';

function SuggestedProfile({ userDocId, username, profileId, userId }) {
  const [followed, setFollowed] = useState(false);

  const handleFollowUser = async () => {
    setFollowed(true);

    await addFollowing(userId, profileId);
    await addFollower(userDocId, userId);
  };

  return (
    <>
      {!followed ? (
        <div className='flex flex-row items-center align-items justify-between'>
          <div className='flex items-center justify-between'>
            <UserCircleIcon className='w-8' />
            <Link to={`/p/${username}`}>
              <p className='font-bold text-sm'>{username}</p>
            </Link>
          </div>

          <button
            className='text-sx font-bold text-blue-medium'
            type='button'
            onClick={handleFollowUser}
          >
            Follow
          </button>
        </div>
      ) : null}
    </>
  );
}

export default SuggestedProfile;

SuggestedProfile.propTypes = {
  userDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};
