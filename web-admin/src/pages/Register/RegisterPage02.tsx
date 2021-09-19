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
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='discription'
        type='email'
        placeholder='Discription'
      />
      <ErrorMessage name='email' />
      
    </>
  );
};

