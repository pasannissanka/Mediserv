import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import {
  DataTable,
  ElementAction,
  LabelKeyValue,
  SearchFields,
} from "../../components";
import { AuthContext } from "../../Context/AuthContext";
import { useFetch } from "../../Hooks/useFetch";
import { OrderData } from "../../Types/types";

export const Orders = () => {
  const { token } = useContext(AuthContext);

  const [dataList, setdataList] = useState<any>([]);

  const { data, isLoading } = useFetch<OrderData[]>(
    "http://localhost:8080/api/orders/",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const history = useHistory();

  useEffect(() => {
    if (!!data) {
      setdataList([
        ...data!.map((order) => {
          return {
            ...order,
            selected: false,
            customerName: order?.customer.name,
          };
        }),
      ]);
    }
  }, [data]);

  const [labelState, setLabelState] = useState<LabelKeyValue[]>([
    {
      key: "pharmacyId",
      value: "Pharmacy Id",
      selected: true,
    },
    {
      key: "status",
      value: "Status",
      selected: true,
    },
    {
      key: "id",
      value: "ID",
      selected: false,
    },
    {
      key: "customerName",
      value: "Customer Full Name",
      selected: true,
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

  const [search, setSearch] = useState<SearchFields>({
    search: "",
    searchBy: "name",
    limit: 10,
    offset: 0,
  });

  const eleActions: ElementAction[] = [
    {
      action: (key: number, event?: any) => {
        console.log("1", key);
        history.push(`/orders/${key}`);
      },
      title: "View Order",
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
    <div className='container mx-auto px-4'>
      <h1 className='text-3xl py-4 mb-1'>Orders</h1>
      <DataTable
        {...{
          eleActions,
          loading: isLoading,
          totalCount: data?.length,
          setSearch,
          search,
          dataList,
          setdataList,
          labelState,
          setLabelState,
          searchFields,
          setSearchFields,
        }}
      />
    </div>
  );
};
