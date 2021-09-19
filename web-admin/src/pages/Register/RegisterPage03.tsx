import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LocationAPIData } from "../../Types/types";
import { RegisterForm } from "./Register";


export interface RegisterPageProps<T> {
  values: T;
  setFieldValue: (
    field: string,
    value: any,
  ) => void;
}

export const RegisterPage03 = (props: RegisterPageProps<RegisterForm>) => {
  return (
    <>
      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='Adress'
        type='text'
        placeholder='Address'
      />
      <ErrorMessage name='Addres' />
      
    </>
  );
};
