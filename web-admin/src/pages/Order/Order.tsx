import { Dialog } from "@headlessui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import ModalPanel from "../../components/ModalPanel/ModelPanel";
import { AuthContext } from "../../Context/AuthContext";
import { OrderData } from "../../Types/types";
import { OrderCustomer } from "./OrderCustomer";
import { OrderItems } from "./OrderItems";
import { OrderTitle } from "./OrderTitle";
import { ProcessOrder } from "./ProcessOrder/ProcessOrder";

export type OrderInfoProp = {
  orderInfo: OrderData;
};

export const Order = () => {
  const { token } = useContext(AuthContext);
  const { orderId } = useParams<any>();
  let completeButtonRef = useRef(null);

  const [modalToggle, setmodalToggle] = useState(false);
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
