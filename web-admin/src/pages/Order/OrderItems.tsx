import React from "react";
import Button from "../../components/Button/Button";
import { ReactComponent as UndrawEmptyCart } from "../../svg/undraw_empty_cart.svg";
import { OrderData, PaymentMethod } from "../../Types/types";
import { OrderInfoProp } from "./Order";

type OrderItemsProps = {
  onOrderProcess: () => void;
} & OrderInfoProp;

export const OrderItems = ({ orderInfo, onOrderProcess }: OrderItemsProps) => {
  return (
    <div className="col-span-2 bg-white rounded-lg border">
      <div className="mx-6 my-4">
        <div className="w-full flex justify-between my-1 text-base lg:text-xl">
          <span>Customer's cart</span>
          <Button
            varient="primary"
            onClick={onOrderProcess}
            className="text-xs"
          >
            Process Order
          </Button>
        </div>
        <div>
          {orderInfo?.items === null || orderInfo?.items?.length === 0 ? (
            <div>
              <UndrawEmptyCart className="max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full" />
              <span className="flex justify-center text-gray-600">
                Cart is empty, Process order to get started
              </span>
            </div>
          ) : (
            <div>
              {orderInfo.items.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="bg-white w-full items-center p-2 rounded-lg shadow my-3"
                  >
                    <div className="grid grid-cols-4 text-base m-2">
                      <div className="col-span-2">{item.name}</div>
                      <div className="col-span-1">{item.count}</div>
                      <div className="col-span-1">{item.total} LKR</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const OrderAmount = ({
  orderInfo,
  dispatchOrder,
}: {
  orderInfo?: OrderData;
  dispatchOrder: () => void;
}) => {
  return (
    <div className="col-span-1 bg-white rounded-lg border overflow-auto">
      <div className="mx-6 my-4 flex flex-col">
        <div className="w-full flex justify-between my-1 text-base lg:text-xl">
          <span>Amount</span>
        </div>
        <div className="border bg-black w-full my-2"></div>
        <div className="flex flex-col justify-center my-4 gap-1">
          <AmountListItem keyString="Total" value={orderInfo?.total} />
          <AmountListItem keyString="Tax" value={orderInfo?.tax} />
          <AmountListItem
            keyString="Shipping Cost"
            value={orderInfo?.shippingCost}
          />
          <AmountListItem keyString="Sub-Total" value={orderInfo?.subTotal} />
          <AmountListItemEnum
            keyString="Payment Method"
            value={orderInfo?.paymentMethod}
          />
        </div>
        <div className="flex justify-end mt-5">
          <Button
            varient="primary"
            className="text-xs"
            onClick={(e) => dispatchOrder()}
          >
            Dispatch Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export const AmountListItem = ({
  keyString,
  value,
}: {
  keyString: string;
  value?: number | string;
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <span className="text-base col-span-4">{keyString}</span>
      <span className="text-base text-gray-500 col-span-1">{value} LKR</span>
    </div>
  );
};

export const AmountListItemEnum = ({
  keyString,
  value,
}: {
  keyString: string;
  value?: PaymentMethod;
}) => {
  return (
    <div className="grid grid-cols-5 gap-4">
      <span className="text-base col-span-4">{keyString}</span>
      {value === PaymentMethod.CASH_ON_DELIVERY ? (
        <div className="flex justify-start text-base text-gray-500 col-span-1">
          <span className="bg-secondary-500 px-3 rounded-md">CASH</span>
        </div>
      ) : (
        <div className="flex justify-start text-base text-gray-500 col-span-1">
          <span className="bg-warn-500 px-3 rounded-md">BANK TRANSFER</span>
        </div>
      )}
    </div>
  );
};
