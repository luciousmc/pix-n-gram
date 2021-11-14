import PropTypes from 'prop-types';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

function UserProfileHeader() {
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);

  return <div>Profile Header</div>;
}

export default UserProfileHeader;
