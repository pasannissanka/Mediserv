import { Menu } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";

type NavBarProps = {
  // isDrawerOpen: boolean;
  // handleDrawerOpen: () => void;
};

export const NavBar = (props: NavBarProps) => {
  return (
    <React.Fragment>
      <header className='flex-shrink-0 max-h-16 bg-gray-100 border-b'>
        <div className='flex items-center justify-between p-2'>
          {/* Drawer toggle */}
          {/* <div className='flex items-center space-x-3'>
            <span className='p-2 text-xl font-semibold tracking-wider uppercase lg:hidden'>
              TL;RL
            </span>
            <button
              onClick={handleDrawerOpen}
              className='p-2 rounded-md focus:outline-none focus:ring'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-4 h-4 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
            </button>
          </div> */}

          <div className='hidden items-center justify-center px-2 space-x-2 md:flex md:flex-1 md:ml-5 md:mr-auto'>
            <span>
              <svg
                className='w-5 h-5 text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
            </span>
            <input
              type='text'
              placeholder='Search'
              className='md:focus:bg-white bg-gray-100 hover:bg-white md:flex-1 md:py-2 lg:max-w-sm'
            />
          </div>

          <div className='flex items-center space-x-3'>
            <div>
              <Menu as='div' className='relative inline-block'>
                <Menu.Button className='p-1 bg-gray-200 rounded-full focus:outline-none focus:ring'>
                  <img
                    className='w-8 h-8 rounded-full object-cover'
                    alt='User Name'
                    src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                  />
                </Menu.Button>
                <div className='absolute bottom-3 right-0 p-1 bg-green-400 rounded-full animate-ping'></div>
                <div className='absolute bottom-3 right-0 p-1 bg-green-400 border border-white rounded-full'></div>
                <Menu.Items className='absolute z-20 mt-4 w-56 bg-white rounded-md shadow-lg transform -translate-x-full'>
                  <Menu.Item
                    as='div'
                    className='flex flex-col p-4 font-medium border-b space-y-1'
                  >
                    <span className='text-center text-gray-800'>name</span>
                  </Menu.Item>

                  <Menu.Item
                    as={Link}
                    to='/profile'
                    className='block px-4 py-2 hover:bg-gray-100 rounded-md transition'
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to='/'
                    className='block px-4 py-2 hover:bg-gray-100 rounded-md transition'
                  >
                    Another Link
                  </Menu.Item>
                  <Menu.Item as={Button}>Logout</Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
