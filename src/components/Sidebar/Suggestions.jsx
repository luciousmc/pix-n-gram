import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { getSuggestedProfiles } from '../../services/firebase';
import SuggestedProfile from './SuggestedProfile';

function Suggestions({ userId, following }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    const suggestedProfiles = async () => {
      const res = await getSuggestedProfiles(userId, following);
      setProfiles(res);
    };

    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return (
    <>
      {!profiles ? (
        <Skeleton count={1} height={150} className='mt-5' />
      ) : profiles.length > 0 ? (
        <div className='rounded flex flex-col'>
          <div className='text-sm flex items-center align-items justify-between mb-2 '>
            <p className='font-bold text-gray-base'>Suggestions for You</p>
          </div>

          <div className='mt-4 grid gap-5'>
            {profiles.map((profile) => (
              <SuggestedProfile
                key={profile.docId}
                userDocId={profile.docId}
                username={profile.username}
                profileId={profile.userId}
                userId={userId}
              />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Suggestions;

Suggestions.proptypes = {
  useriD: PropTypes.string,
  following: PropTypes.array,
};
