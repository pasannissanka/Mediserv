import React from "react";
import * as timeago from "timeago.js";
import { OrderInfoProp } from "./Order";

export const OrderTitle = ({ orderInfo }: OrderInfoProp) => {
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
