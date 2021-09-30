import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import * as timeago from "timeago.js";
import { DataFeed } from "../../components";
import Button from "../../components/Button/Button";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import { AuthContext } from "../../Context/AuthContext";
import { ReactComponent as UndrawEmptyCart } from "../../svg/undraw_empty_cart.svg";
import { ReactComponent as UndrawVoid } from "../../svg/undraw_void.svg";
import { OrderData } from "../../Types/types";
import {
  createImageFromInitials,
  getRandomColor,
} from "../../Utils/ImgFromInitials";

type OrderInfoProp = {
  orderInfo: OrderData;
};

type OrderItemsProps = {
  onOrderProcess: () => void;
} & OrderInfoProp;
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

const OrderItems = ({ orderInfo, onOrderProcess }: OrderItemsProps) => {
  return (
    <div className='col-span-2 bg-white rounded-lg border'>
      <div className='mx-6 my-4'>
        <div className='w-full flex justify-between my-1 text-base lg:text-xl'>
          <span>Customer's cart</span>
          <Button
            varient='primary'
            onClick={onOrderProcess}
            className='text-xs'
          >
            Process Order
          </Button>
        </div>
        <div>
          {orderInfo?.items === null || orderInfo?.items?.length === 0 ? (
            <div>
              <UndrawEmptyCart className='max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full' />
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

export const Order = () => {
  const { token } = useContext(AuthContext);

  const { orderId } = useParams<any>();

  const [modalToggle, setmodalToggle] = useState(false);

  let completeButtonRef = useRef(null);

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
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-4 lg:gap-4 mt-4'>
          {orderInfo && (
            <OrderItems
              orderInfo={orderInfo!}
              onOrderProcess={() => setmodalToggle(!modalToggle)}
            />
          )}
          {orderInfo && <OrderCustomer orderInfo={orderInfo} />}
        </div>
      </div>
      <Dialog
        open={modalToggle}
        onClose={() => setmodalToggle(false)}
        initialFocus={completeButtonRef}
      >
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
        <ModalPanel
          initialFocus={completeButtonRef}
          title='Process Order'
          closeAction={setmodalToggle}
          size='xl'
          titleSVG={
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
          }
          footerContent={<div>TEST</div>}
        >
          {orderInfo && <ProcessOrder orderInfo={orderInfo} />}
        </ModalPanel>
      </Dialog>
    </>
  );
};

const ProcessOrder = ({ orderInfo }: OrderCustomerProps) => {
  const { token } = useContext(AuthContext);

  const [image, setImage] = useState<any>();

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `http://localhost:8080/api/file/download/${orderInfo?.prescriptionImgUrl}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const imageBlob = await response.blob();
      console.log(imageBlob);
      if (imageBlob.type === "image/jpeg") {
        const image = URL.createObjectURL(imageBlob);
        setImage(image);
      }
    };
    fetchImage();
  }, [orderInfo]);

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className=' flex-auto grid h-full grid-cols-1 lg:grid-cols-5 gap-y-2 lg:gap-2 py-3 px-4'>
        <div className='col-span-1 lg:col-span-3 bg-white rounded-lg border px-6 py-2 overflow-auto'>
          <div className=''>
            {image !== undefined ? (
              <img src={image} alt='prescriptionImage' />
            ) : (
              <div>
                <UndrawVoid className='max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full' />
                <span className='flex justify-center text-gray-600'>
                  Prescription Image not found!
                </span>
              </div>
            )}
          </div>
        </div>
        <div className='col-span-1 lg:col-span-2 bg-white rounded-lg border px-6 py-2 overflow-auto'>
          <div className=''>Items</div>
        </div>
      </div>
    </div>
  );
};
