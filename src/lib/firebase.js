import { initializeApp } from 'firebase/app';
import { getFirestore, FieldValue } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAT9TGt6-pthF6JG-ps9GAKI3rBb0hIE6Q',
  authDomain: 'pix-n-gram.firebaseapp.com',
  projectId: 'pix-n-gram',
  storageBucket: 'pix-n-gram.appspot.com',
  messagingSenderId: '348192370164',
  appId: '1:348192370164:web:9eba9f95492d3e32e19da1',
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { firebaseApp, db, auth, FieldValue };
