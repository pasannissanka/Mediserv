import {
  createImageFromInitials,
  getRandomColor,
} from "../../Utils/ImgFromInitials";
import { OrderInfoProp } from "./Order";

type OrderCustomerProps = {} & OrderInfoProp;

export const OrderCustomer = ({ orderInfo }: OrderCustomerProps) => {
  return (
    <div className='col-span-1 bg-white rounded-lg border'>
      <div className='mx-6 my-4'>
        <div className='w-full flex justify-between my-1 text-base lg:text-xl'>
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
