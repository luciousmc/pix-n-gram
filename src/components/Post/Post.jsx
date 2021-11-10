import PropTypes from 'prop-types';
import { useRef } from 'react';
import ActionBar from './ActionBar';
import PostHeader from './postHeader';
import PostImage from './PostImage';

function Post({
  postId,
  imgSrc,
  comments,
  postUserId,
  likes,
  userLikedPhoto,
  postUsername,
  postLatitude,
  postLongitude,
  postCaption,
  photoId,
  dateCreated,
}) {
  const commentInputRef = useRef(null);
  const handleFocus = () => commentInputRef.current.focus();

  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary mb-8'>
      <PostHeader username={postUsername} />
      <PostImage src={imgSrc} caption={postCaption} />
      <ActionBar
        docId={postId}
        totalLikes={likes.length}
        likedPhoto={userLikedPhoto}
        handleFocus={handleFocus}
      />
    </div>
  );
}

export { Post };

Post.propTypes = {
  postId: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  postUserId: PropTypes.string.isRequired,
  likes: PropTypes.array.isRequired,
  userLikedPhoto: PropTypes.bool.isRequired,
  postUsername: PropTypes.string.isRequired,
  postLatitude: PropTypes.string,
  postLongitude: PropTypes.string,
  postCaption: PropTypes.string.isRequired,
  photoId: PropTypes.number.isRequired,
  dateCreated: PropTypes.object.isRequired,
};
