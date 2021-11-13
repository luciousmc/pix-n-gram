import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/Profile/';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [userExists, setUserExists] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const getUserProfile = async () => {
      const [profileUser] = await getUserByUsername(username);

      if (profileUser) {
        setUserExists(true);
        setUser(profileUser);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    getUserProfile();
  }, [username, history]);

  return (
    userExists && (
      <div className='bg-gray-background'>
        <Header />
        <div className='mx-auto max-w-screen-lg'>
          <UserProfile />
        </div>
      </div>
    )
  );
}

export default Profile;
