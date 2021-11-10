import PropTypes from 'prop-types';

function PostFooter({ caption, username }) {
  return (
    <div className='p-4 pt-2 pb-0'>
      <p>
        <span className='mr-1 font-bold'>{username}</span>
        <span>{caption}</span>
      </p>
    </div>
  );
}

export default PostFooter;

PostFooter.propTypes = {
  caption: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};
