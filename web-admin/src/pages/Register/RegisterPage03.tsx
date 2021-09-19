import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LocationAPIData } from "../../Types/types";
import { RegisterForm } from "./Register";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";



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
        as='textarea'
        rows={2}
      />
      <ErrorMessage name='Addres' />

      <MapContainer
      className="h-20 "
        center={{ lat: 51.505, lng: -0.09 }}
        zoom={13}
        scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

      </MapContainer>,
       
    </> 
      
  );
};




