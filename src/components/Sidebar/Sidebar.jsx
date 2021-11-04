import React from 'react';

// Hooks
import useUser from '../../hooks/use-user';

// Components
import User from './User';
import Suggestions from './Suggestions';

function Sidebar() {
  const {
    user: { username, fullName, userId },
  } = useUser();

  return (
    <div className='p-4'>
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}

export { Sidebar };
