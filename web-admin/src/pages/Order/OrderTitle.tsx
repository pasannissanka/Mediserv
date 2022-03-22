import React from "react";
import * as timeago from "timeago.js";
import { OrderStatus } from "../../Types/types";
import { OrderInfoProp } from "./Order";

export const OrderTitle = ({ orderInfo }: OrderInfoProp) => {
  const bgColor =
    orderInfo.status === OrderStatus.NEW
      ? "bg-secondary-500"
      : orderInfo.status === OrderStatus.PROCESSED
      ? "bg-primary-500"
      : orderInfo.status === OrderStatus.DISPATCHED
      ? "bg-green-500"
      : "bg-warn-500";
  return (
    <div className="w-full">
      <div className="flex justify-start">
        <h1 className="text-3xl pt-4">Order #{orderInfo.id}</h1>
      </div>
      <span className="mt-1 text-sm text-gray-600">
        {timeago.format(orderInfo?.createdAt as Date)}
      </span>
      <div className="flex my-2">
        <div className={`px-2 py-1 rounded-lg ${bgColor}`}>
          {orderInfo?.status}
        </div>
      </div>
    </div>
  );
};
