import React, { useEffect, useState } from "react";
import {
  DataTable,
  ElementAction,
  LabelKeyValue,
  SearchFields,
} from "../../components";
import Button from "../../components/Button/Button";
import { useFetch } from "../../Hooks/useFetch";
import { UserData, IResponse } from "../../Types/types";

export const Customers = () => {
  const [dataList, setdataList] = useState<any>([]);
  const { data, isLoading } = useFetch<IResponse<UserData[]>>(
    "http://localhost:8080/api/customers/",
    {
      method: "GET",
    }
  );

  useEffect(() => {
    if (data?.payload) {
      setdataList([
        ...data!.payload.map((user) => {
          return {
            ...user,
            selected: false,
          };
        }),
      ]);
    }
  }, [data]);

  const [search, setSearch] = useState<SearchFields>({
    search: "",
    searchBy: "name",
    limit: 10,
    offset: 0,
  });

  const [labelState, setLabelState] = useState<LabelKeyValue[]>([
    {
      key: "email",
      value: "Email",
      selected: true,
    },
    {
      key: "name",
      value: "Name",
      selected: true,
    },
    {
      key: "id",
      value: "ID",
      selected: false,
    },
  ]);

  const [searchFields, setSearchFields] = useState<LabelKeyValue[]>([
    {
      key: "name",
      value: "Name",
      selected: false,
    },
    {
      key: "email",
      value: "Email",
      selected: false,
    },
    {
      key: "all",
      value: "All",
      selected: false,
    },
  ]);

  const eleActions: ElementAction[] = [
    {
      action: (key: number, event?: any) => {
        console.log("1", key);
      },
      title: "Test Action 1",
      svg: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-4 h-4' // Required!
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      ),
    },
    {
      action: (key?: number, event?: any) => {
        console.log("2", key);
      },
      title: "Test Action 2",
      svg: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          className='w-4 h-4' // Required!
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl py-4 mb-1'>Customers</h1>
        <DataTable
          {...{
            eleActions,
            loading: isLoading,
            totalCount: data?.payload.length,
            setSearch,
            search,
            dataList,
            setdataList,
            labelState,
            setLabelState,
            searchFields,
            setSearchFields,
          }}
          globalActions={
            <div className='ml-2'>
              <Button varient='outline'>
                <span className='hidden md:block'>Add</span>
                <svg
                  className='w-5 h-5 ml-1'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
                  />
                </svg>
              </Button>
            </div>
          }
        />
      </div>
    </>
  );
};
