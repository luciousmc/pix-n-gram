import React, { useEffect, useState } from 'react';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Navigation
import { Link, useHistory } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

function Login() {
  const history = useHistory();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isInvalid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      console.log(userCredential.user.displayName);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Invalid User. User may have been deleted.');
      }

      setEmailAddress('');
      setPassword('');
    }
  };

  useEffect(() => {
    document.title = 'Pix n Gram - Login';
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

          <form onSubmit={handleLogin} method='POST'>
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
              Login
            </button>
          </form>
        </div>

        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border rounded border-gray-primary'>
          <p className='text-sm'>Don't have an accout? </p>
          <Link to={ROUTES.SIGNUP} className='font-bold text-blue-medium'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
