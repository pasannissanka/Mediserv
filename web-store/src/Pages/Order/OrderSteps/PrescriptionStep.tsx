import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { RegisterForm } from "../Order";
import { DeliveryPageProps } from "./DeliveryInformationStep";

export type Img = {
  preview: string;
} & File;

export const Prescription = ({
  values,
  setFieldValue,
}: DeliveryPageProps<RegisterForm>) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setFieldValue(
        "prescriptionImg",
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      // values.prescriptionImg.forEach((file) =>
      //   URL.revokeObjectURL(file.preview)
      // );
    },
    [values.prescriptionImg]
  );

  const thumbs = values.prescriptionImg.map((file, idx) => (
    <div className='' key={file.name}>
      <img
        src={file.preview}
        className='h-60 rounded-lg shadow-lg'
        alt='preview'
      />
    </div>
  ));

  return (
    <>
      <div className='container mx-auto pt-2'>
        Upload prescription here
        <div
          {...getRootProps({
            className:
              "py-14 bg-gray-200 w-11/12 mx-auto sm:px-6 lg:px-8 mt-2 rounded-lg",
          })}
        >
          <input {...getInputProps()} />
          <div className='flex flex-col border-2 border-dashed border-gray-400 rounded-md py-2  items-center'>
            {values.prescriptionImg.length === 0 ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-3/12 p-2'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                />
              </svg>
            ) : (
              <div>{thumbs}</div>
            )}
            <p className='text-gray-500 py-2'>Drop files to upload or select</p>
          </div>
        </div>
      </div>
    </>
  );
};
