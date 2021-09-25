import { Tab } from "@headlessui/react";
import { FormikErrors, FormikTouched } from "formik";
import React, { useState } from "react";
import { InputField } from "../../../Components/InputField/InputField";
import { RegisterForm } from "../Order";
import { DeliveryPageProps } from "./DeliveryInformationStep";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const PaymentDetails = ({
  errors,
  touched,
  setFieldValue,
  values,
}: DeliveryPageProps<RegisterForm>) => {
  let [categories] = useState<any[]>([
    {
      name: "Credit Card",
      type: "BANK_TRANSFER",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
          />
        </svg>
      ),
      panel: <CardDetails errors={errors} touched={touched} />,
    },
    {
      name: "Cash on delivery",
      type: "CASH_ON_DELIVERY",
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z'
          />
        </svg>
      ),
      panel: <div>Test</div>,
    },
  ]);

  return (
    <div>
      <div className='mb-4'>Add payment method</div>
      <Tab.Group
        defaultIndex={categories.findIndex(
          (v) => v.type === values.paymentDetails.deliveryMethod
        )}
        onChange={(index) => {
          setFieldValue(
            "paymentDetails.deliveryMethod",
            categories[index].type
          );
        }}
      >
        <Tab.List className='flex p-1 space-x-1  rounded-xl'>
          {categories.map((item, idx) => {
            return (
              <Tab
                key={idx}
                as='button'
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm leading-5 font-medium text-gray-500 rounded-lg",
                    "focus:outline-none",
                    selected
                      ? "border text-black "
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-primary-500"
                  )
                }
              >
                <div className='flex justify-center'>
                  {item.icon}
                  <span className='mx-3'>{item.name}</span>
                </div>
              </Tab>
            );
          })}
        </Tab.List>
        <Tab.Panels className='mt-2'>
          {categories.map((item, idx) => {
            return (
              <Tab.Panel key={idx}>
                <div>{item.panel}</div>
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

type CardDetailsProps<T> = {
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
};

const CardDetails = ({ errors, touched }: CardDetailsProps<RegisterForm>) => {
  return (
    <>
      <InputField
        errors={errors.paymentDetails?.cardNumber}
        touched={touched.paymentDetails?.cardNumber}
        as='input'
        disabled={true}
        className='appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm'
        name='cardNumber'
        type='text'
        placeholder='Card number'
      />

      <InputField
        errors={errors.paymentDetails?.cardNumber}
        touched={touched.paymentDetails?.cardNumber}
        as='input'
        disabled={true}
        className='appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm'
        name='cardholderName'
        type='text'
        placeholder='Card holder name'
      />

      <InputField
        errors={errors.paymentDetails?.cardNumber}
        touched={touched.paymentDetails?.cardNumber}
        as='input'
        disabled={true}
        className='appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm '
        name='validthrough'
        type='text'
        placeholder='Valid through'
      />

      <InputField
        errors={errors.paymentDetails?.cardNumber}
        touched={touched.paymentDetails?.cardNumber}
        as='input'
        disabled={true}
        className='appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm'
        name='cvv'
        type='text'
        placeholder='CVV'
      />
    </>
  );
};
