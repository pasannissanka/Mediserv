import { ErrorMessage, Field, FieldAttributes } from "formik";
import React from "react";

type InputFieldProps = {
  label: string;
  errors: string;
  touched: boolean;
  name: string;
} & FieldAttributes<any>;

export const InputField = ({
  label,
  errors,
  touched,
  ...props
}: InputFieldProps) => {
  const fieldId = `field${props.name}`;
  return (
    <div className='flex flex-col w-full'>
      <label className='mx-2 text-sm -mb-1' htmlFor={fieldId}>
        {label}
      </label>
      <Field {...props} id={fieldId} />
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
