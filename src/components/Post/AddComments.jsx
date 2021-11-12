import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import UserContext from '../../context/user';

function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = async (event) => {
    if (!comment.length >= 1) return;

    event.preventDefault();
  };

  return (
    <div className='border-t border-gray-primary'>
      <form
        className='flex justify-between pl-0 pr-5'
        method='POST'
        onSubmit={handleSubmitComment}
      >
        <input
          aria-label='Add a Comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Add a Comment'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
      </form>
    </div>
  );
}

export default AddComment;

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired,
};
