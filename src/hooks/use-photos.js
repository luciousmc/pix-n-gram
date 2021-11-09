import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext);

  useEffect(() => {
    const getTimeLinePhotos = async () => {
      const { following } = await getUserByUserId(userId);
      let followedUserPhotos;

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }
    };
  }, []);

  return <div></div>;
}

export default usePhotos;
