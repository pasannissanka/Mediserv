import React from "react";
import { Link as RouterLink } from "react-router-dom";

type DrawerProps = {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export const Drawer = ({ isDrawerOpen, handleDrawerOpen }: DrawerProps) => {
  return (
    <React.Fragment>
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-64 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none
				${isDrawerOpen ? "-translate-x-full lg:translate-x-0 lg:w-20" : ""}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between flex-shrink-0 p-2 ${
            isDrawerOpen ? "lg:justify-center" : ""
          }`}
        >
          <span className='p-2 text-xl font-semibold leading-8 tracking-wider uppercase whitespace-nowrap'>
            M
            <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
              edi Serv
            </span>
          </span>
          <button
            className='p-2 rounded-md lg:hidden'
            onClick={handleDrawerOpen}
          >
            <svg
              className='w-6 h-6 text-gray-600'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
        <nav className='flex-1 overflow-hidden hover:overflow-y-auto'>
          <ul className='p-2 overflow-hidden'>
            <li>
              <RouterLink
                to='/'
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? "justify-center" : ""
                }`}
              >
                <span>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
                  Dashboard
                </span>
              </RouterLink>
              <RouterLink
                to='/users'
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? "justify-center" : ""
                }`}
              >
                <span>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
                  Users
                </span>
              </RouterLink>
              <RouterLink
                to='/posts'
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? "justify-center" : ""
                }`}
              >
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6 text-gray-400'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
                  Posts
                </span>
              </RouterLink>
              <RouterLink
                to='/activities'
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? "justify-center" : ""
                }`}
              >
                <span>
                  <svg
                    className='w-6 h-6 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
                  Activities
                </span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div className='flex-shrink-0 p-2 border-t max-h-14'>
          <button className='flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring'>
            <span>
              <svg
                className='w-6 h-6'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
                />
              </svg>
            </span>
            <span className={`${isDrawerOpen ? "lg:hidden" : ""}`}>
              {" "}
              Logout{" "}
            </span>
          </button>
        </div>
      </aside>
    </React.Fragment>
  );
};
