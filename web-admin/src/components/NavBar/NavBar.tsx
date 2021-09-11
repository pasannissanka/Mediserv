import { Menu } from "@headlessui/react";
import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../Button/Button";

type NavBarProps = {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export const NavBar = ({ handleDrawerOpen, isDrawerOpen }: NavBarProps) => {
  const { setUser, setToken } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    setUser(undefined);
    setToken(null);
    history.push("/");
  };

  return (
    <React.Fragment>
      <header className='flex-shrink-0 border-b bg-white'>
        <div className='flex items-center justify-between p-2'>
          <div className='flex items-center space-x-3'>
            <span className='p-2 text-xl font-semibold tracking-wider uppercase lg:hidden'>
              Medi Serv
            </span>
            <button
              onClick={handleDrawerOpen}
              className='p-2 rounded-md focus:outline-none focus:ring'
            >
              <svg
                className={`w-4 h-4 text-gray-600 ${
                  !isDrawerOpen
                    ? "transform transition-transform -rotate-180"
                    : ""
                }`}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 5l7 7-7 7M5 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>

          <div className='items-center hidden px-2 space-x-2 md:flex-1 md:flex md:mr-auto md:ml-5'>
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
              className='px-4 py-3 rounded-md hover:bg-gray-100 lg:max-w-sm md:py-2 md:flex-1 focus:outline-none md:focus:bg-gray-100 md:focus:shadow md:focus:border'
            />
          </div>

          <div className='relative flex items-center space-x-3'>
            <div className='items-center hidden space-x-3 md:flex'>
              {/* <!-- Notification Button --> */}
              <div className='relative'>
                <div className='absolute right-0 p-1 bg-red-400 rounded-full animate-ping'></div>
                <div className='absolute right-0 p-1 bg-red-400 border rounded-full'></div>
                <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
                  <svg
                    className='w-6 h-6 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                    />
                  </svg>
                </button>
              </div>

              <div>
                <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
                  <svg
                    className='w-6 h-6 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'
                    />
                  </svg>
                </button>
              </div>

              <div className='relative'>
                <button className='p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring'>
                  <svg
                    className='w-6 h-6 text-gray-500'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* <!-- avatar button --> */}
            <div className='relative'>
              <Menu>
                <Menu.Button className='p-1 bg-gray-200 rounded-full focus:outline-none focus:ring'>
                  <img
                    className='object-cover w-8 h-8 rounded-full'
                    src='https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                    alt='User Name'
                  />
                </Menu.Button>
                <div className='absolute right-0 p-1 bg-green-400 rounded-full bottom-3 animate-ping'></div>
                <div className='absolute right-0 p-1 bg-green-400 border border-white rounded-full bottom-3'></div>
                <Menu.Items className='z-20 absolute mt-4 transform -translate-x-full bg-white rounded-md shadow-lg w-56'>
                  <Menu.Item
                    as='div'
                    className='flex flex-col p-4 space-y-1 font-medium border-b'
                  >
                    <span className='text-gray-800'>First name Last name</span>
                    {/* <span className="text-sm text-gray-300">{me?.me.user.username}</span> */}
                    <span className='text-sm text-gray-400'>Email</span>
                  </Menu.Item>

                  <Menu.Item
                    as={Link}
                    to='/profile'
                    className='block px-4 py-2 transition rounded-md hover:bg-gray-100'
                  >
                    Profile
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to='/'
                    className='block px-4 py-2 transition rounded-md hover:bg-gray-100'
                  >
                    Another Link
                  </Menu.Item>
                  <Menu.Item
                    as={Button}
                    varient='flat'
                    rounded={false}
                    className='flex items-center p-4 border-t w-full py-2 text-base rounded-b-md'
                    onClick={handleLogout}
                  >
                    Logout
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
