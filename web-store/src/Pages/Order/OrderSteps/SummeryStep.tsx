import React from "react";
import { Card } from "../../../Components/Card/Card";

export const Summery = () => {
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
              <label className='text-sm'>56</label>
              <label className='text-sm'>2021/9/20</label>
              <label className='text-sm'>Credit card</label>
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
                  <label className='text-sm'>Jhon wick</label>
                  <label className='text-sm'>jhonwick@gmail.com</label>
                  <label className='text-sm'>0771234567</label>
                </div>
              </div>
            </div>

            <div className='flex flex-col  mx-auto'>
              <div className='text-sm font-medium'>Billing address</div>
              <label className='text-sm content-end'>56</label>
              <label className='text-sm'>lanka pharmacy</label>
              <label className='text-sm'>colombo 7</label>
            </div>
          </div>
        </div>

        {/* <div className="bg-gray-100 rounded-md my-3 p-3">
          <div className="font-medium">Prescription</div>
          <div className="w-2/4 mx-auto">
            <Card></Card>
          </div>
        </div> */}
      </div>
    </>
  );
};
