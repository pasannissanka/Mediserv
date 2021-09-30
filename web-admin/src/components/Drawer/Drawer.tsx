import React, { useContext } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

type DrawerProps = {
  isDrawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export const Drawer = ({ isDrawerOpen, handleDrawerOpen }: DrawerProps) => {
  const { setUser, setToken } = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setUser(undefined);
    setToken(null);
    history.push('/');
  };

  return (
    <React.Fragment>
      <aside
        className={`fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-48 max-h-screen overflow-hidden transition-all transform bg-white border-r shadow-lg lg:z-auto lg:static lg:shadow-none
				${isDrawerOpen ? '-translate-x-full lg:translate-x-0 lg:w-20' : ''}`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between flex-shrink-0 p-2 ${isDrawerOpen ? 'lg:justify-center' : ''}`}
        >
          <span className="p-2 text-xl font-semibold leading-8 tracking-wider  whitespace-nowrap">
            M<span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>ediServ</span>
          </span>
          <button className="p-2 rounded-md lg:hidden" onClick={handleDrawerOpen}>
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-hidden hover:overflow-y-auto">
          <ul className="p-2 overflow-hidden">
            <li>
              {/* dashboard */}
              <RouterLink
                to="/"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100  ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    className="w-7 h-7 mb-3 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Dashboard</span>
              </RouterLink>
              <RouterLink
                to="/orders"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 mb-3 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Orders</span>
              </RouterLink>
              <RouterLink
                to="/users"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    className="w-7 h-7 mb-3  text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Users</span>
              </RouterLink>
              <RouterLink
                to="/customers"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mb-3 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Customers</span>
              </RouterLink>
              <RouterLink
                to="/activities"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mb-3 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Activities</span>
              </RouterLink>
              <RouterLink
                to="/activities"
                className={`flex items-center p-2 space-x-2 rounded-md hover:bg-gray-100 ${
                  isDrawerOpen ? 'justify-center' : ''
                }`}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7 mb-3 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}>Profile</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
        <div className="flex-shrink-0 p-2 border-t max-h-14">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full px-4 py-2 space-x-1 font-medium tracking-wider uppercase bg-gray-100 border rounded-md focus:outline-none focus:ring hover:bg-warn-500 hover:text-white transition duration-300"
          >
            <span>
              <svg
                className="w-7 h-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            <span className={`${isDrawerOpen ? 'lg:hidden' : ''}`}> Logout </span>
          </button>
        </div>
      </aside>
    </React.Fragment>
  );
};
