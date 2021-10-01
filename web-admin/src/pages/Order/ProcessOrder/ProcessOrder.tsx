import { FieldArray, Form, Formik, FormikProps } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../components/Button/Button";
import { InputField } from "../../../components/InputField/InputField";
import { AuthContext } from "../../../Context/AuthContext";
import { ReactComponent as UndrawVoid } from "../../../svg/undraw_void.svg";
import { OrderInfoProp } from "../Order";

type ProcessOrderProps<T> = {
  submitRef: React.RefObject<FormikProps<any>> | undefined;
  onSubmit(value: T): void;
} & OrderInfoProp;

export const ProcessOrder = <T extends unknown>({
  orderInfo,
  submitRef,
  onSubmit,
}: ProcessOrderProps<T>) => {
  const { token } = useContext(AuthContext);

  const [image, setImage] = useState<string | null>();

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

      if (imageBlob.type === "image/jpeg") {
        const image = URL.createObjectURL(imageBlob);
        setImage(image);
      } else {
        setImage(null);
      }
    };
    fetchImage();
  }, [orderInfo, token]);

  return (
    <div className='w-full h-full overflow-hidden'>
      <div className='flex-auto grid h-full grid-cols-1 lg:grid-cols-5 gap-y-2 lg:gap-2 py-3 px-4'>
        <div className='col-span-1 lg:col-span-3 bg-white rounded-lg border px-1 py-1 overflow-auto'>
          <div className=''>
            {image === undefined ? (
              <div>
                {/* Loading */}
                <UndrawVoid className='max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full' />
                <span className='flex justify-center text-gray-600'>
                  Loading...
                </span>
              </div>
            ) : image === null ? (
              <div>
                {/* Not found */}
                <UndrawVoid className='max-h-72 h-36 md:h-48 lg:h-72 my-8 w-full' />
                <span className='flex justify-center text-gray-600'>
                  Prescription Image not found!
                </span>
              </div>
            ) : (
              <img src={image} alt='prescriptionImage' />
            )}
          </div>
        </div>
        <div className='col-span-1 lg:col-span-2 bg-white rounded-lg border px-6 py-2 overflow-auto'>
          <div className=''>
            <OrderItems submitRef={submitRef} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

type OrderItemsProps<T> = {
  submitRef: React.RefObject<FormikProps<any>> | undefined;
  onSubmit(value: any): void;
};

interface OrderItemType {
  name: string;
  quantity: string;
  price: string;
}

export interface OrderItemsType {
  items: OrderItemType[];
}

const OrderItems = ({
  submitRef,
  onSubmit,
}: OrderItemsProps<OrderItemsType>) => {
  return (
    <div className='m-2 w-full'>
      <div className='text-lg '>Items</div>
      <Formik<OrderItemsType>
        innerRef={submitRef}
        initialValues={{
          items: [
            {
              name: "",
              price: "",
              quantity: "",
            },
          ],
        }}
        onSubmit={(values) => {
          // console.log(values);
          onSubmit(values);
        }}
      >
        {({ values }) => (
          <Form>
            <FieldArray
              name='items'
              render={(arrayHelpers) => (
                <div>
                  {values.items.map((item, index) => (
                    <div key={index}>
                      <div className='border my-3 rounded-lg'>
                        <div className='flex justify-between my-2 mx-2'>
                          <div className='grid grid-cols-4'>
                            <div className='col-span-2'>
                              <InputField
                                placeholder='Drug'
                                className='rounded-md my-2 sm:text-sm mx-2 '
                                type='text'
                                name={`items.${index}.name`}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                placeholder='Quantity'
                                className='rounded-md my-2 sm:text-sm mx-2'
                                type='text'
                                name={`items.${index}.quantity`}
                              />
                            </div>
                            <div className='col-span-1'>
                              <InputField
                                placeholder='Price'
                                className='rounded-md my-2 sm:text-sm mx-2'
                                type='text'
                                name={`items.${index}.price`}
                              />
                            </div>
                          </div>
                          <div className='m-auto'>
                            <Button
                              rounded={true}
                              size='sm'
                              varient='warn'
                              className='rounded-full'
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='h-5 w-5'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  strokeWidth={2}
                                  d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
                                />
                              </svg>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div>
                    <Button
                      varient='primary'
                      type='button'
                      onClick={() => arrayHelpers.push("")}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
