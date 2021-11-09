import Skeleton from 'react-loading-skeleton';
import usePhotos from '../hooks/use-photos';

function Timeline() {
  const { photos } = usePhotos();

  console.log(`photos`, photos);

  return <div className='container col-span-2'>I am a Timeline</div>;
}

export default Timeline;

// Get logged in user's photos
// use react skeleton while loading photos
// if there are photos, render them (create post component)
// if there are no photos, tell user to create some
