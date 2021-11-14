import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUserByUsername } from '../services/firebase';
import * as ROUTES from '../constants/routes';
import Header from '../components/Header';
import UserProfile from '../components/Profile/';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const getUserProfile = async () => {
      const [profileUser] = await getUserByUsername(username);

      if (profileUser) {
        setUser(profileUser);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    };
    getUserProfile();
  }, [username, history]);

  return user?.username ? (
    <div className='bg-gray-background'>
      <Header />
      <div className='mx-auto max-w-screen-lg'>
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}

export default Profile;
