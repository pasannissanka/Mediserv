import { ErrorMessage, Field } from "formik";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { RegisterForm } from "../Order";

export interface DeliveryPageProps<T> {
  values: T;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const DeliveryInformation = ({
  values,
  setFieldValue,
}: DeliveryPageProps<RegisterForm>) => {
  return (
    <>
      <div className='container grid grid-cols-2 pt-2'>
        <div>
          <div>Add your delivery information here</div>
          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.name'
            type='text'
            placeholder='Name'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.name'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.email'
            type='email'
            placeholder='Email'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.email'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.phoneNumber'
            type='text'
            placeholder='Phone number'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.phoneNumber'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.province'
            type='text'
            placeholder='Province'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.province'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.district'
            type='text'
            placeholder='District'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.district'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineOne'
            type='text'
            placeholder='Address line 01'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.lineOne'
          />

          <Field
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineTwo'
            type='text'
            placeholder='Address line 02'
          />
          <ErrorMessage
            component='div'
            className='text-xs text-warn-500'
            name='deliveryInfo.lineTwo'
          />
        </div>
        <span className='w-3/4 m-auto'>
          <MapContainer
            className='h-80'
            center={{ lat: 7.8731, lng: 80.7718 }}
            zoom={6}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LeafletgeoSearch />
          </MapContainer>
        </span>
      </div>
    </>
  );
};

function LeafletgeoSearch() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: "lk",
      },
    });

    const searchControl = GeoSearchControl({
      provider,
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        }),
      },
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
}
