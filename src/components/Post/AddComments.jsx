import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import UserContext from '../../context/user';
import { db } from '../../lib/firebase';

function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = async (event) => {
    if (!comment.length >= 1) return;

    event.preventDefault();

    try {
      await updateDoc(doc(db, 'photos', docId), {
        comments: arrayUnion({ comment, displayName }),
      });

      setComments((prevComments) => [
        { displayName, comment },
        ...prevComments,
      ]);
      setComment('');
    } catch (error) {
      console.log(error.message);
    }
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
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type='submit'
          disabled={comment.length < 1}
        >
          Send
        </button>
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
