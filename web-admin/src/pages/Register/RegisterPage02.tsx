import { ErrorMessage, Field } from "formik";
import React from "react";

import { RegisterForm } from "./Register";

export interface RegisterPageProps<T> {
  values: T;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const RegisterPage02 = (props: RegisterPageProps<RegisterForm>) => {
  const position = [51.505, -0.09];
  return (
    <>
      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='title'
        type='text'
        placeholder='Title'
      />
      <ErrorMessage name='title' />
      <Field
        className='focus:border-primary-300 focus:ring-primary-700 px-2 py-2 border-gray-300 border shadow-sm focus:ring-1 focus:ring-opacity-50appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='discription'
        type='email'
        placeholder='Discription'
        as='textarea'
        rows={8}
      />
      <ErrorMessage name='email' />
    </>
  );
};
