import React from "react";
import { useParams } from "react-router";

type OrderItemProps = {};

export const OrderItem = (props: OrderItemProps) => {
  const { orderId } = useParams<any>();

  console.log(orderId);

  return (
    <>
      <div className='container mx-auto px-4'>
        <h1 className='text-3xl py-4 mb-1'>Order #{orderId}</h1>
        <div className='grid grid-cols-3 gap-4'>
          <div className='col-span-2 bg-white rounded-lg border'>
            <div className='mx-6 my-4'>
              <div className='w-full flex'>Order ID</div>
              <div className='flex'>Order Items</div>
            </div>
          </div>
          <div className='col-span-1 bg-white rounded-lg border'>
            <div className='mx-6 my-4'>
              <div className='flex w-full'>Customer</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
