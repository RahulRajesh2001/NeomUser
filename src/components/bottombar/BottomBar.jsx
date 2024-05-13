import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BottomBar = () => {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  //logout functionality
  const Logout = () => {
    localStorage.removeItem('userToken')
    navigate('/loginSignup')
  }

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 '>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-end mx-auto p-4 '>
        <button
          onClick={toggleMenu}
          type='button'
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls='navbar-default'
        >
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>
        <div
          className={`w-full md:w-auto ${isOpen ? 'block' : 'hidden'} md:block`}
          id='navbar-default'
        >
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 '>
            <li>
              <Link
                to={'/dashboard'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold '
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to={'/profile'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to={'/orderHistory'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to={'/wishlist'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                to={'/wallet'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Wallet
              </Link>
            </li>
            <li>
              <Link
                to={'/cart'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                to={'/cupons'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Cupons
              </Link>
            </li>
            <li>
              <Link
                to={'/offers'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Offers
              </Link>
            </li>
            <li onClick={() => Logout()}>
              <Link
                to={'/'}
                className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-[15px] font-Playfair font-semibold'
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default BottomBar
