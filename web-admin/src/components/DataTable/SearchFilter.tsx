import { Menu } from "@headlessui/react";
import * as React from "react";
import Button from "../Button/Button";
// import { useHistory } from "react-router-dom";
import { useDataTableContext } from "./Context/DataTableContext";
import { SearchFilterProps } from "./types";

/**
 * Primary UI component search/ filter data elements
 * TODO : Search by multiple fields
 *
 */
export function SearchFilter(props: SearchFilterProps) {
  const {
    searchFields,
    setSearchFields,
    search,
    setSearch,
    labelState,
    setLabelState,
  } = useDataTableContext();

  // const history = useHistory();
  const container = React.createRef<HTMLDivElement>();
  const [toggleMenus, setToggleMenus] = React.useState({
    filter: false,
    search: false,
  });
  const [searchQ, setsearchQ] = React.useState({ search: "" });

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchQ({ search: event.target.value });
  };

  const handleClickOutside = (event: any) => {
    if (container.current && !container.current.contains(event.target)) {
      setToggleMenus({
        filter: false,
        search: false,
      });
    }
  };

  const selectedSearch = searchFields!.find((field) => field.selected);

  const handleSetSearchQuery = () => {
    setSearch!({
      ...search!,
      offset: 0,
      search: searchQ.search,
      searchBy: selectedSearch!.key,
    });
    // history.push({
    //   search: `?${selectedSearch?.key}=${searchQ.search.toString()}`,
    // });
  };

  const handleCheckOnChange = (
    index: number,
    key: string,
    type: "search" | "filter"
  ) => {
    if (type === "filter") {
      setLabelState!([
        ...labelState!.slice(0, index),
        {
          ...labelState![index],
          selected: !labelState![index].selected,
        },
        ...labelState!.slice(index + 1),
      ]);
    }
    if (type === "search") {
      setSearchFields!([
        ...searchFields!.map((label) => {
          return {
            ...label,
            selected: label.key === key ? true : false,
          };
        }),
      ]);
    }
  };

  return (
    <React.Fragment>
      <div className='mb-4 flex justify-start items-center'>
        {/* Search/ filter box */}
        <div className='flex'>
          <div className='relative'>
            <input
              type='search'
              name='search'
              className='w-auto font-medium text-sm rounded-r-none'
              placeholder='Search by...'
              value={searchQ.search}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className='flex relative'>
          <Menu as={React.Fragment}>
            <Menu.Button
              as={Button}
              varient='flat'
              rounded={false}
              size='md'
              className='border'
              onClick={() =>
                setToggleMenus({
                  ...toggleMenus,
                  search: !toggleMenus.search,
                })
              }
            >
              <span className='hidden md:block'>{selectedSearch?.value}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <rect x='0' y='0' width='24' height='24' stroke='none'></rect>
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </Menu.Button>
            <Menu.Items className='z-10 absolute top-0 left-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden'>
              {searchFields!.map(({ value, selected, key }, index) => (
                <Menu.Item
                  as='div'
                  key={index}
                  className='flex justify-start items-center text-truncate hover:bg-gray-100 py-2'
                  onClick={() => handleCheckOnChange(index, key, "search")}
                >
                  {() => (
                    <label
                      key={index}
                      className={`flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2`}
                    >
                      <div className='text-teal-600 mr-3'>
                        <input
                          type='radio'
                          className='focus:outline-none focus:shadow-outline'
                          value={value}
                          checked={selected}
                          onChange={() =>
                            handleCheckOnChange(index, key, "search")
                          }
                        />
                      </div>
                      <div className='select-none text-gray-700'>{value}</div>
                    </label>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <Button
            varient='flat'
            rounded={false}
            className='border rounded-r-md'
            onClick={handleSetSearchQuery}
          >
            <span className='hidden md:block'>Search </span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-5 h-5 ml-2'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <rect x='0' y='0' width='24' height='24' stroke='none'></rect>
              <circle cx='10' cy='10' r='7' />
              <line x1='21' y1='21' x2='15' y2='15' />
            </svg>
          </Button>
        </div>
        <div className='md:flex-1'></div>
        <div>
          {/* Row display */}
          <div className='relative'>
            <Menu as='div' className='flex'>
              <Menu.Button
                as={Button}
                varient='outline'
                onClick={() =>
                  setToggleMenus({
                    ...toggleMenus,
                    filter: !toggleMenus.filter,
                  })
                }
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-6 h-6 md:hidden'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='0' y='0' width='24' height='24' stroke='none'></rect>
                  <path d='M5.5 5h13a1 1 0 0 1 0.5 1.5L14 12L14 19L10 16L10 12L5 6.5a1 1 0 0 1 0.5 -1.5' />
                </svg>
                <span className='hidden md:block'>Display</span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-5 h-5 ml-1'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='0' y='0' width='24' height='24' stroke='none'></rect>
                  <polyline points='6 9 12 15 18 9' />
                </svg>
              </Menu.Button>
              <Menu.Items className='z-10 absolute top-0 left-0 w-40 bg-white rounded-lg shadow-lg mt-12 -mr-1 block py-1 overflow-hidden'>
                {labelState!.map(({ value, selected, key }, index) => (
                  <Menu.Item
                    as='div'
                    key={index}
                    className='flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2'
                    onClick={() => handleCheckOnChange(index, key, "filter")}
                  >
                    {() => (
                      <label
                        key={index}
                        className={`flex justify-start items-center text-truncate hover:bg-gray-100 px-4 py-2`}
                      >
                        <div className='text-teal-600 mr-3'>
                          <input
                            type='checkbox'
                            className='form-checkbox focus:outline-none focus:shadow-outline'
                            value={value}
                            checked={selected}
                            onChange={() =>
                              handleCheckOnChange(index, key, "filter")
                            }
                          />
                        </div>
                        <div className='select-none text-gray-700'>{value}</div>
                      </label>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>
        </div>
        {props.globalActions}
      </div>
    </React.Fragment>
  );
}
