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

export const RegisterPage01 = (props: RegisterPageProps<RegisterForm>) => {
  return (
    <>
      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='name'
        type='text'
        placeholder='Full Name'
      />
      <ErrorMessage name='name' />
      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='email'
        type='email'
        placeholder='Email'
      />
      <ErrorMessage name='email' />

      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='password'
        type='password'
        placeholder='Password'
      />
      <ErrorMessage name='password' />

      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='retypePassword'
        type='password'
        placeholder='Re-enter Password'
      />
      <ErrorMessage name='retypePassword' />
    </>
  );
};
