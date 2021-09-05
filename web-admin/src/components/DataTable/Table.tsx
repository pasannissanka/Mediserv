import * as React from "react";
import Button from "../Button/Button";
import LoadingDisplay from "../Common/LoadingDisplay";
import NoRecordsFound from "../Common/NoRecordsFound";
import { ActionItem } from "./ActionItem";
import { useDataTableContext } from "./Context/DataTableContext";
import { TableProps } from "./types";

/**
 * Primary UI component for table
 */
export function Table(props: TableProps) {
  const {
    dataList,
    setdataList,
    labelState,
    totalCount,
    setSearch,
    loading,
    search,
  } = useDataTableContext();

  const [selected, setSelected] = React.useState({
    allSelected: false,
    count: 0,
  });

  const [pagBtnState, setPagBtnState] = React.useState({
    next: false,
    prev: false,
  });

  const handleAllElementsCheckbox = () => {
    setSelected({
      count: selected.allSelected ? 0 : dataList.length,
      allSelected: !selected.allSelected,
    });
    setdataList!([
      ...dataList.map((user: any) => {
        return {
          ...user,
          selected: selected.count !== dataList.length,
        };
      }),
    ]);
  };

  const handleElementCheckbox = (index: number) => {
    setSelected({
      count: !dataList[index].selected
        ? selected.count + 1
        : selected.count - 1,
      allSelected: selected.count + 1 === dataList.length,
    });
    setdataList!([
      ...dataList.slice(0, index),
      {
        ...dataList[index],
        selected: !dataList[index].selected,
      },
      ...dataList.slice(index + 1),
    ]);
  };

  const handlePageLimitChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch!({
      ...search!,
      limit: parseInt(event.target.value),
    });
  };

  const handlePageOffsetChange = (action: "prev" | "next") => {
    if (action === "prev") {
      setSearch!({
        ...search!,
        offset: search!.offset - search!.limit,
      });
    } else {
      setSearch!({
        ...search!,
        offset: search!.offset + search!.limit,
      });
    }
  };

  React.useEffect(() => {
    if (dataList.length > 0) {
      setPagBtnState({
        next: search!.offset + search!.limit < totalCount!,
        prev: search!.offset >= dataList.length,
      });
    }
  }, [search, dataList, totalCount]);

  const ListTable = dataList ? (
    dataList.map((item: any, index: number) => (
      <tr key={item.id}>
        <td className='border-dashed border-t border-gray-200 px-3 '>
          <label className='text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer'>
            <input
              type='checkbox'
              className='form-checkbox rowCheckbox focus:outline-none focus:shadow-outline'
              checked={item.selected}
              onChange={() => handleElementCheckbox(index)}
            />
          </label>
        </td>
        {labelState!.map(({ key, selected }, index) =>
          selected ? (
            <td className='border-dashed border-t border-gray-200' key={index}>
              <span className='text-gray-700 px-6 py-3 flex items-center'>
                {item[key]}
              </span>
            </td>
          ) : (
            <React.Fragment key={index}></React.Fragment>
          )
        )}
        {props.eleActions ? (
          <ActionItem
            id={item.id}
            index={index}
            eleActions={props.eleActions}
          />
        ) : null}
      </tr>
    ))
  ) : (
    <></>
  );

  return (
    <React.Fragment>
      <div className='bg-gray-100 h-11 border-b-2 rounded-lg rounded-b-none shadow'>
        {selected.count > 0 ? (
          <div className='inline-flex'>
            <Button varient='warn' className='mx-2'>
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                />
              </svg>
            </Button>
            <Button varient='outline-primary'>
              <svg
                className='w-4 h-4'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3'
                />
              </svg>
            </Button>
          </div>
        ) : null}
        <div className='inline-flex'>
          {/* TODO add more content - Table top header */}
          {selected.count > 0 ? (
            <span className='inline-flex items-center mx-1 my-2 text-sm text-gray-500 py-2 px-1 md:px-2'>
              Selected {selected.count} of {dataList.length} result(s)
            </span>
          ) : null}
        </div>
      </div>
      <div className=' bg-white rounded-lg rounded-t-none rounded-b-none shadow relative'>
        {loading ? (
          <LoadingDisplay /> // TODO use an overlay
        ) : dataList.length > 0 ? (
          <table className='border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative'>
            <thead>
              <tr className='text-left'>
                <th className='py-2 px-3 sticky top-0 border-b border-gray-200 bg-gray-100'>
                  <label className='text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer'>
                    <input
                      type='checkbox'
                      className='form-checkbox focus:outline-none focus:shadow-outline'
                      checked={
                        selected.count === dataList.length &&
                        dataList.length !== 0
                      }
                      onChange={handleAllElementsCheckbox}
                    />
                  </label>
                </th>
                {labelState!.map(({ value, selected }, index) =>
                  selected ? (
                    <th
                      key={index}
                      className='bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'
                    >
                      {value}
                    </th>
                  ) : null
                )}
                {props.eleActions ? (
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Actions
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>{ListTable}</tbody>
          </table>
        ) : (
          <NoRecordsFound text='No Records Found!' />
        )}
      </div>
      <div className='bg-gray-100 h-11 rounded-lg rounded-t-none shadow flex justify-between'>
        <div className='inline-flex'>
          <button
            className={`ml-2 mr-1 my-1 shadow rounded-md inline-flex items-center  text-gray-500 focus:outline-none focus:shadow-outline py-1 px-1 md:px-4 text-sm disabled:opacity-50
						${
              !pagBtnState.prev
                ? `cursor-default`
                : ` hover:text-blue-500 bg-gray-50 focus:ring-primary-200 transition-colors duration-300`
            }`}
            onClick={() => handlePageOffsetChange("prev")}
            disabled={!pagBtnState.prev}
          >
            <svg
              className='w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            <span className='hidden md:block ml-2'>Prev</span>
          </button>
          <button
            className={`ml-2 mr-1 my-1 shadow rounded-lg inline-flex items-center text-gray-500 focus:outline-none focus:shadow-outline py-1 px-1 md:px-4 text-sm disabled:opacity-50
						${
              !pagBtnState.next
                ? `cursor-default`
                : ` hover:text-blue-500 bg-gray-50 focus:ring-primary-200 transition-colors duration-300`
            }`}
            onClick={() => handlePageOffsetChange("next")}
            disabled={!pagBtnState.next}
          >
            <span className='hidden md:block'>Next</span>
            <svg
              className='w-4 h-4 ml-2'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M14 5l7 7m0 0l-7 7m7-7H3'
              />
            </svg>
          </button>
        </div>
        <div className='inline-flex'>
          <span className='inline-flex items-center mx-1 my-2 text-sm text-gray-500 py-2 px-1 md:px-2'>
            View{" "}
            <select
              className='rounded-lg py-1 px-1 pr-6 mx-2 text-sm'
              onChange={handlePageLimitChange}
              value={search!.limit}
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
              <option value='100'>100</option>
            </select>
            items per page.
          </span>
        </div>
        <div className='inline-flex'>
          <span className='inline-flex items-center mx-1 my-2 text-sm text-gray-500 py-2 px-1 md:px-2'>
            Showing {search!.offset + 1}-{search!.offset + dataList.length} of{" "}
            {totalCount} result(s)
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
