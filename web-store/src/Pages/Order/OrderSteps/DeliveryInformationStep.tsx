import { FormikErrors, FormikTouched } from "formik";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { InputField } from "../../../Components/InputField/InputField";
import { RegisterForm } from "../Order";

export interface DeliveryPageProps<T> {
  values: T;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

export const DeliveryInformation = ({
  values,
  setFieldValue,
  errors,
  touched,
}: DeliveryPageProps<RegisterForm>) => {
  console.log(errors);
  return (
    <>
      <div className='container grid grid-cols-2 pt-2'>
        <div>
          <div className='mb-4'>Add your delivery information here</div>
          <InputField
            errors={errors.deliveryInfo?.name}
            touched={touched.deliveryInfo?.name}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.name'
            type='text'
            placeholder='Name'
          />

          <InputField
            errors={errors.deliveryInfo?.email}
            touched={touched.deliveryInfo?.email}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.email'
            type='email'
            placeholder='Email'
          />

          <InputField
            errors={errors.deliveryInfo?.phoneNumber}
            touched={touched.deliveryInfo?.phoneNumber}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.phoneNumber'
            type='text'
            placeholder='Phone number'
          />

          <div className='flex justify-between'>
            <InputField
              errors={errors.deliveryInfo?.province}
              touched={touched.deliveryInfo?.province}
              className='appearance-none rounded-md relative block w-full my-2 sm:text-sm mr-1'
              name='deliveryInfo.province'
              type='text'
              placeholder='Province'
            />

            <InputField
              errors={errors.deliveryInfo?.district}
              touched={touched.deliveryInfo?.district}
              className='appearance-none rounded-md relative block w-full my-2 sm:text-sm ml-1'
              name='deliveryInfo.district'
              type='text'
              placeholder='District'
            />
          </div>

          <InputField
            errors={errors.deliveryInfo?.lineOne}
            touched={touched.deliveryInfo?.lineOne}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineOne'
            type='text'
            placeholder='Address line 01'
          />

          <InputField
            errors={errors.deliveryInfo?.lineTwo}
            touched={touched.deliveryInfo?.lineTwo}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineTwo'
            type='text'
            placeholder='Address line 02'
          />
        </div>
        <span className='w-full px-4 m-auto pt-6'>
          <MapContainer
            className='h-96'
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
