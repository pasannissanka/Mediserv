import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { DataFeed } from "../../components";
import { AuthContext } from "../../Context/AuthContext";
import { OrderData } from "../../Types/types";
import { ReactComponent as UndrawEmptyCart } from "../../svg/undraw_empty_cart.svg";
import Button from "../../components/Button/Button";
import * as timeago from "timeago.js";
import {
  createImageFromInitials,
  getRandomColor,
} from "../../Utils/ImgFromInitials";

type OrderInfoProp = {
  orderInfo: OrderData;
};

type OrderItemsProps = {} & OrderInfoProp;
type OrderCustomerProps = {} & OrderInfoProp;

const OrderTitle = ({ orderInfo }: OrderInfoProp) => {
  return (
    <div className='w-full'>
      <div className='flex justify-start'>
        <h1 className='text-3xl pt-4'>Order #{orderInfo.id}</h1>
      </div>
      <span className='mt-1 text-sm text-gray-600'>
        {timeago.format(orderInfo?.createdAt as Date)}
      </span>
      <div className='flex my-1'>
        <div className=' px-2 py-1 bg-secondary-500 rounded-lg '>
          {orderInfo?.status}
        </div>
      </div>
    </div>
  );
};

const OrderItems = ({ orderInfo }: OrderItemsProps) => {
  return (
    <div className='col-span-2 bg-white rounded-lg border'>
      <div className='mx-6 my-4'>
        <div className='w-full flex justify-between my-1 text-xl'>
          <span>Customer's cart</span>
          <Button varient='primary'>Process Order</Button>
        </div>
        <div>
          {orderInfo?.items === null || orderInfo?.items?.length === 0 ? (
            <div>
              <UndrawEmptyCart className='max-h-72 my-8 mx-auto' />
              <span className='flex justify-center text-gray-600'>
                Cart is empty, Process order to get started
              </span>
            </div>
          ) : (
            <DataFeed
              dataList={orderInfo?.items as any}
              loading={false}
              totalCount={orderInfo?.items?.length}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const OrderCustomer = ({ orderInfo }: OrderCustomerProps) => {
  return (
    <div className='col-span-1 bg-white rounded-lg border'>
      <div className='mx-6 my-4'>
        <div className='w-full flex justify-between my-1 text-xl'>
          <span>Customer</span>
        </div>
        <div className='border bg-black w-full my-2'></div>
        <div className='flex my-3'>
          <img
            className='rounded-full h-12 w-12'
            src={createImageFromInitials(
              500,
              orderInfo.customer.name,
              getRandomColor()
            )}
            alt='customer profile'
          />
          <div className='flex-1 ml-4'>
            <span className='flex text-base text-black'>
              {orderInfo.customer.name}
            </span>
            <span className='flex text-sm text-gray-600'>
              {orderInfo.customer.email}
            </span>
          </div>
        </div>
        <div className='border bg-black w-full my-2'></div>
        <div className='w-full my-3'>
          Shipping Address
          <span className='text-base text-gray-600 flex flex-col my-2'>
            <span>{orderInfo.customer.name}</span>
            <span>{orderInfo.deliveryAddress.lineOne}</span>
            <span>{orderInfo.deliveryAddress.lineTwo}</span>
          </span>
        </div>
        <div className='border bg-black w-full my-2'></div>
        <div className='w-full my-3'>
          Billing Address
          <span className='text-base text-gray-600 flex flex-col my-2'>
            <span>{orderInfo.customer.name}</span>
            <span>{orderInfo.deliveryAddress.lineOne}</span>
            <span>{orderInfo.deliveryAddress.lineTwo}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export const Order = () => {
  const { token } = useContext(AuthContext);
  const { orderId } = useParams<any>();

  const [orderInfo, setOrderInfo] = useState<OrderData>();

  useEffect(() => {
    const fetchData = async () => {
      if (orderId) {
        const response = await fetch(
          `http://localhost:8080/api/orders/${orderId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: OrderData = await response.json();
        setOrderInfo(data);
      }
    };
    fetchData();
  }, [orderId, token]);

  return (
    <>
      <div className='container mx-auto px-4'>
        {orderInfo && <OrderTitle orderInfo={orderInfo} />}
        <div className='grid grid-cols-3 gap-4 mt-4'>
          {orderInfo && <OrderItems orderInfo={orderInfo!} />}
          {orderInfo && <OrderCustomer orderInfo={orderInfo} />}
        </div>
      </div>
    </>
  );
};
