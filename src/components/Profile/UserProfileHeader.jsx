import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isLoggedInUserFollowing } from '../../services/firebase';
import { UserCircleIcon } from '@heroicons/react/solid';

function UserProfileHeader({
  profile,
  photosCount,
  followerCount,
  setFollowerCount,
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const btnFollow = profile.username && profile.username != user.username;

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isLoggedInUserFollowing(
        user.username,
        profile.userId
      );
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profile.userId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profile.userId]);

  const handleToggleFollow = () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    setFollowerCount({
      followerCount: isFollowingProfile
        ? profile.followers.length - 1
        : profile.followers.length + 1,
    });
  };

  return (
    <div className='grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen'>
      <div className='container flex justify-center'>
        <UserCircleIcon
          className='w-40 flex'
          alt={`${profile.username} profile`}
        />
      </div>

      <div className='flex justify-center items-center flex-col col-span-2'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{profile.username}</p>
          {btnFollow && (
            <button
              onClick={handleToggleFollow}
              className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>

        <div className='container flex mt-4'>
          {profile.followers === undefined ||
          profile.following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span>
                {` `}
                {photosCount === 1 ? 'post' : 'posts'}
              </p>
              <p className='mr-10'>
                <span>{profile.followers.length}</span>
                {` `}
                {profile.followers.length === 1 ? 'follower' : 'followers'}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{profile.following.length}</span>
                {` `}
                following
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfileHeader;

UserProfileHeader.propTypes = {
  photosCount: PropTypes.number.isRequired,
  profile: PropTypes.shape({
    userId: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    dateCreated: PropTypes.object.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    fullName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
};
