import PropTypes from 'prop-types';

function Post({
  postId,
  imgSrc,
  comments,
  postUserId,
  likes,
  userLIkedPhoto,
  postUsername,
  postLatitude,
  postLongitude,
  postCaption,
  photoId,
  dateCreated,
}) {
  return <div>I am a post!</div>;
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
  dateCreated: PropTypes.number.isRequired,
};
