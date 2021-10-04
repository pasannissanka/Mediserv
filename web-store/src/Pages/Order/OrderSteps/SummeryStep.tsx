import React from "react";
import { OrderData } from "../../../Types/types";
import { RegisterForm } from "../Order";
import { DeliveryPageProps } from "./DeliveryInformationStep";

export const Summery = ({
  data,
  values,
}: DeliveryPageProps<RegisterForm, OrderData>) => {
  console.log(data);
  return (
    <>
      <div className='container pt-2'>
        <div>Order summery</div>
        <div className='bg-gray-100 rounded-md my-3 p-3'>
          <div className='font-medium'>Order Details</div>

          <div className='grid grid-cols-2 mt-2'>
            <div className='flex flex-col'>
              <label className='text-sm' htmlFor='orderNumber'>
                Order number
              </label>
              <label className='text-sm' htmlFor='date'>
                Date
              </label>
              <label className='text-sm' htmlFor='paymentMethod'>
                Payment method
              </label>
            </div>

            <div className='flex flex-col mx-auto'>
              <label className='text-sm'>{data?.id}</label>
              <label className='text-sm'>
                {data?.createdAt &&
                  new Date(data?.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </label>
              <label className='text-sm'>
                {data?.paymentMethod === "BANK_TRANSFER"
                  ? "Credit Card"
                  : data?.paymentMethod === "CASH_ON_DELIVERY"
                  ? "Cash on Delivery"
                  : ""}
              </label>
            </div>
          </div>
        </div>

        <div className='bg-gray-100 rounded-md my-3 p-3'>
          <div className='font-medium'>Customer Details</div>

          <div className='grid grid-cols-2 mt-2'>
            <div className='flex flex-col'>
              <div className='text-sm font-medium'>Contact</div>
              <div className='grid grid-cols-2'>
                <div className='flex flex-col'>
                  <label className='text-sm' htmlFor='orderNumber'>
                    Name
                  </label>
                  <label className='text-sm' htmlFor='date'>
                    Email
                  </label>
                  <label className='text-sm' htmlFor='paymentMethod'>
                    Phone number
                  </label>
                </div>
                <div className='flex flex-col'>
                  <label className='text-sm'>{data?.customer?.name}</label>
                  <label className='text-sm'>{data?.customer?.email}</label>
                  {/* <label className='text-sm'>0771234567</label> */}
                </div>
              </div>
            </div>

            <div className='flex flex-col  mx-auto'>
              <div className='text-sm font-medium'>Billing address</div>
              <label className='text-sm content-end'>
                {data?.deliveryAddress?.lineOne}
              </label>
              <label className='text-sm'>
                {data?.deliveryAddress?.lineTwo}
              </label>
              {/* <label className='text-sm'>colombo 7</label> */}
            </div>
          </div>
        </div>

        <div className='bg-gray-100 rounded-md my-3 p-3'>
          <div className='font-medium'>Prescription</div>
          <div className='w-2/4 mx-auto'>
            <img
              src={values?.prescriptionImg[0]?.preview}
              alt='prescriptionimage'
            />
          </div>
        </div>
      </div>
    </>
  );
};
