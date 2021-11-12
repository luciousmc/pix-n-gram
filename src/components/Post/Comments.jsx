import PropTypes from 'prop-types';
import { formatDistance } from 'date-fns';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Comments({ docId, comments: allComments, posted, commentInput }) {
  const [comments, setComments] = useState(allComments);

  console.log(Date.now());
  return (
    <>
      <div className='p-4 pt-1 pb-4'>
        {comments.length >= 3 && (
          <p className='text-sm text-gray-base mb-1 cursor-pointer'>
            View all {comments.length} comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p className='mb-1' key={`${item.comment}-${item.displayName}`}>
            <Link to={`/p/${item.displayName}`}>
              <span className='mr-1 font-bold'>{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className='text-gray-base uppercase text-xs mt-2'>
          {formatDistance(posted.seconds, new Date().getSeconds())} ago
        </p>
      </div>
    </>
  );
}

export default Comments;

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.object.isRequired,
  commentInput: PropTypes.object.isRequired,
};
