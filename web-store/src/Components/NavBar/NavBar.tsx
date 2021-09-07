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
        <div className='flex items-center justify-between p-1'>
          <Link
            to='/'
            className='p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap'
          >
            Medi Serv
          </Link>

          <div className='hidden items-center justify-center px-2 space-x-2 md:flex md:flex-1'>
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
                <Menu.Button
                  as={"button"}
                  className='p-2 rounded-full inline-flex h-full justify-center text-sm focus:ring-1 focus:ring-primary-200 transition-colors duration-300 text-gray-500 hover:bg-gray-200 bg-gray-100'
                >
                  <span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-8 w-8'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                  </span>
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
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
