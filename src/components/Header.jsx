import React, { useContext } from 'react';
import UserContext from '../context/user';

// Navigation
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

// Firebase
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

// Icons
import { LogoutIcon, HomeIcon } from '@heroicons/react/outline';
import { UserCircleIcon } from '@heroicons/react/solid';

function Header() {
  const { user } = useContext(UserContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert(`${user.displayName} has been logged out`);
    } catch (error) {
      alert('error', error.message);
    }
  };

  return (
    <header className='h-16 bg-white border-b border-gray-primary mb-8'>
      <div className='container mx-auto max-w-screen-lg h-full'>
        <div className='flex justify-between h-full'>
          <div className='text-gray-700 text-center flex items-center align-items cursor-pointer'>
            <h1 className='flex justify-center w-full'>
              <Link to={ROUTES.DASHBOARD} aria-label='Logo'>
                PIX N GRAM
              </Link>
            </h1>
          </div>

          <div className='text-gray-700 text-center flex items-center align-items'>
            {user ? (
              <>
                <button title='Home'>
                  <Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
                    <HomeIcon className='headerIcon' />
                  </Link>
                </button>

                <button title='Sign Out' onClick={handleSignOut}>
                  <LogoutIcon className='headerIcon' />
                </button>

                <button className='flex-items-center cursor-pointer'>
                  <Link to={`/p/${user.displayName}`}>
                    <UserCircleIcon className='headerIcon' />
                  </Link>
                </button>
              </>
            ) : (
              <>
                <button className='bg-blue-medium font-bold text-sm rounded text-white w-20 h-8'>
                  <Link to={ROUTES.LOGIN}>Log In</Link>
                </button>

                <button className='text-sm rounded text-blue-medium font-bold w-20 h-8'>
                  <Link to={ROUTES.SIGNUP}>Sign Up</Link>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
