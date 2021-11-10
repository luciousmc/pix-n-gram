import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
// Firebase
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
// Context
import UserContext from '../../context/user';
// Icons
import { ChatIcon, HeartIcon } from '@heroicons/react/outline';

function ActionBar({ docId, totalLikes, likedPhoto, handleFocus }) {
  const {
    user: { uid: userId },
  } = useContext(UserContext);

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await updateDoc(doc(db, 'photos', docId), {
      likes: toggleLiked ? arrayRemove(userId) : arrayUnion(userId),
    });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className='flex justify-between p-4'>
        <div className='flex'>
          <HeartIcon
            onClick={handleToggleLiked}
            className={`w-8 mr-4 select-none cursor-pointer ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
          />
          <ChatIcon className='w-8 text-black-light select-none cursor-pointer' />
        </div>
      </div>
      <div className='p-4 py-0'>
        <p className='font-bold'>
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}

export default ActionBar;

ActionBar.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
