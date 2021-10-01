import { OrderInfoProp } from "./Order";
import { ReactComponent as UndrawEmptyCart } from "../../svg/undraw_empty_cart.svg";
import { DataFeed } from "../../components";
import Button from "../../components/Button/Button";

type OrderItemsProps = {
  onOrderProcess: () => void;
} & OrderInfoProp;

export const OrderItems = ({ orderInfo, onOrderProcess }: OrderItemsProps) => {
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
