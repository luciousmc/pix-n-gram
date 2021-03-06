import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export function seedDatabase() {
  const users = [
    {
      userId: 'zeujiMw3JhR80Zsmggo7kD9zgs02',
      username: 'Marlon',
      fullName: 'Marlon Clay',
      emailAddress: 'luciousmc@icloud.com',
      following: ['2'],
      followers: ['2', '3', '4'],
      dateCreated: serverTimestamp(),
    },
    {
      userId: '2',
      username: 'raphael',
      fullName: 'Raffaello Sanzio da Urbino',
      emailAddress: 'raphael@sanzio.com',
      following: [],
      followers: ['zeujiMw3JhR80Zsmggo7kD9zgs02'],
      dateCreated: serverTimestamp(),
    },
    {
      userId: '3',
      username: 'dali',
      fullName: 'Salvador Dalí',
      emailAddress: 'salvador@dali.com',
      following: [],
      followers: ['zeujiMw3JhR80Zsmggo7kD9zgs02'],
      dateCreated: serverTimestamp(),
    },
    {
      userId: '4',
      username: 'orwell',
      fullName: 'George Orwell',
      emailAddress: 'george@orwell.com',
      following: [],
      followers: ['zeujiMw3JhR80Zsmggo7kD9zgs02'],
      dateCreated: serverTimestamp(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    addDoc(collection(db, 'users'), users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    addDoc(collection(db, 'photos'), {
      photoId: i,
      userId: '2',
      imageSrc: `/images/users/raphael/${i}.jpg`,
      caption: 'Saint George and the Dragon',
      likes: [],
      comments: [
        {
          displayName: 'dali',
          comment: 'Love this place, looks like my animal farm!',
        },
        {
          displayName: 'orwell',
          comment: 'Would you mind if I used this picture?',
        },
      ],
      userLatitude: '40.7128°',
      userLongitude: '74.0060°',
      dateCreated: serverTimestamp(),
    });
  }
}
