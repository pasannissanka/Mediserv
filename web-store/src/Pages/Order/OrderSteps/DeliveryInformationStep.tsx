import { ErrorMessage, Field, Form, yupToFormErrors } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Button from "../../../Components/Button/Button";
import { Card } from "../../../Components/Card/Card";
import { RegisterForm } from "../Order";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";



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
  const [locationData, setLocationData] = useState<{
    province: any[];
    district: any[];
    town: any[];
  }>({ district: [], province: [], town: [] });



  return (
    <>
      <div className='container grid grid-cols-2 pt-2'>
        <div>
          <div>Add your delivery information here</div>
          <Form>
            <Field
              className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
              name='name'
              type='text'
              placeholder='Name'
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
              name='phoneNumber'
              type='text'
              placeholder='Phone number'
            />
            <ErrorMessage name='phoneNumber' />

            <Select
              name='province'
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='Province'
              onChange={(option) => setFieldValue("province", option)}
              options={locationData.province}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='province' />

            <Select
              name='district'
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='District'
              onChange={(option) => setFieldValue("district", option)}
              options={locationData.province}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='district' />

            <Field
              className='w-full sm:text-sm'
              name='houseNo'
              type='text'
              placeholder='House no'
            />
            <ErrorMessage name='houseNo' />

            <Field
              className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
              name='lineOne'
              type='text'
              placeholder='Address line 01'
            />
            <ErrorMessage name='lineOne' />


          </Form>

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