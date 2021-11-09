import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';
import Post from './Post';

function Timeline() {
  const { photos } = usePhotos();

  return (
    <div className='container col-span-2'>
      {!photos ? (
        <>
          <Skeleton count={4} width={640} height={400} className='mb-5' />
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post
            key={content.docId}
            postId={content.docId}
            imgSrc={content.imageSrc}
            comments={content.comments}
            postUserId={content.userId}
            likes={content.likes}
            userLikedPhoto={content.userLikedPhoto}
            postUsername={content.username}
            postLatitude={content.userLatitude}
            postLongitude={content.userLongitude}
            postCaption={content.caption}
            photoId={content.photoId}
          />
        ))
      ) : (
        <p className='text-center text-2xl'>Follow Poeple to see their Pix</p>
      )}
    </div>
  );
}

export default Timeline;

// Get logged in user's photos
// use react skeleton while loading photos
// if there are photos, render them (create post component)
// if there are no photos, tell user to create some
