import React, { useContext } from 'react';

// Context
import UserContext from '../context/user';

// Navigation
import * as ROUTES from '../constants/routes';
import { Link } from 'react-router-dom';

// Firebase
import { signOut } from 'firebase/auth';

// Icons
import { LogoutIcon, HomeIcon } from '@heroicons/react/outline';

function Header() {
  const { user } = useContext(UserContext);

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
                <div className='space-x-4'>
                  <Link to={ROUTES.DASHBOARD} aria-label='Dashboard'>
                    <button title='Home'>
                      <HomeIcon className='h-8' />
                    </button>
                  </Link>

                  <button title='Sign Out' onClick={() => signOut()}>
                    <LogoutIcon className='h-8' />
                  </button>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
