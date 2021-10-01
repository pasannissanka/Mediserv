import { ErrorMessage, Field, FieldAttributes } from "formik";
import React from "react";

type InputFieldProps = {
  errors: string;
  touched: boolean;
  name: string;
} & FieldAttributes<any>;

export const InputField = ({ errors, touched, ...props }: InputFieldProps) => {
  return (
    <div className='flex flex-col'>
      <Field {...props} />
      {errors && touched ? (
        <ErrorMessage
          component='div'
          className='text-xs text-warn-500 -mt-1 p-0'
          name={props.name}
        />
      ) : (
        <div className='h-2 -mt-1'></div>
      )}
    </div>
  );
};
