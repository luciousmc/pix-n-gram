import { HeartIcon, ChatIcon } from '@heroicons/react/solid';

function Photos({ photos }) {
  return (
    <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
      <div className='grid grid-cols-3 gap-8 mt-4 mb-12'>
        {!photos ? (
          <>
            <Skeleton count={12} width={320} height={400} />
          </>
        ) : photos.length > 0 ? (
          photos.map((photo) => (
            <div key={photo.docId} className='relative group'>
              <img
                className='w-full h-full object-cover'
                src={photo.imageSrc}
                alt={photo.caption}
              />

              <div className='absolute hidden bottom-0 left-0 z-10 w-full justify-evenly items-center h-full bg-black-faded group-hover:flex'>
                <p className='flex items-center text-white font-bold'>
                  <HeartIcon className='w-8 mr-4' />
                  {photo.likes.length}
                </p>

                <p className='flex items-center text-white font-bold'>
                  <ChatIcon className='w-8 mr-4' />
                  {photo.comments.length}
                </p>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
}

export default Photos;
