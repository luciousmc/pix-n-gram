import React, { useEffect, useRef, useState } from 'react';

// Firebase
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// Navigation
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

// Service
import { doesUserNameExist } from '../services/firebase';

function SignUp() {
  const history = useHistory();
  const usernameRef = useRef(null);

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userNameExists = await doesUserNameExist(userName);

    if (!userNameExists) {
      try {
        // Authentication
        //  Create user and update username
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: userName,
        });

        // Add user to the Database
        const docRef = addDoc(collection(db, 'users'), {
          userId: userCredential.user.uid,
          username: userName.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: serverTimestamp(),
        });
      } catch (error) {
        setFullName('');
        setEmailAddress('');
        setPassword('');
        setUserName('');
        setError(error.message);
      }
    } else {
      usernameRef.current.focus();
      setPassword('');
      setError('User already exists. Please choose another.');
    }
  };

  useEffect(() => {
    document.title = 'Pix n Gram - Create an Account';
  }, []);

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img src='/images/iphone-with-profile.jpg' alt='Iphone with profile' />
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center bg-white p-4 border rounded border-gray-primary mb-4'>
          <h1 className='flex justify-center w-full text-2xl font-bold py-3'>
            PIX N GRAM
          </h1>

          {error && <p className='mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleSignUp} method='POST'>
            <input
              ref={usernameRef}
              aria-label='Enter your User Name'
              placeholder='User Name'
              type='text'
              value={userName}
              className='text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 rounded border border-gray-primary mb-2'
              onChange={({ target }) => setUserName(target.value)}
            />

            <input
              aria-label='Enter your Full Name'
              placeholder='Full Name'
              type='text'
              value={fullName}
              className='text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 rounded border border-gray-primary mb-2'
              onChange={({ target }) => setFullName(target.value)}
            />

            <input
              aria-label='Enter your email address'
              placeholder='Email Address'
              type='text'
              value={emailAddress}
              className='text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 rounded border border-gray-primary mb-2'
              onChange={({ target }) => setEmailAddress(target.value)}
            />

            <input
              aria-label='Enter your password'
              placeholder='Password'
              type='password'
              value={password}
              className='text-sm text-gray-base w-full mr-3 py-4 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-300 text-white w-full rounded h-8 font-bold ${
                isInvalid && 'opacity-50'
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary'>
          <p className='text-sm'>Already have an account? </p>
          <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
