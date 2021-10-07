import { ErrorMessage, FormikErrors, FormikTouched } from "formik";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import Select from "react-select";
import { InputField } from "../../../Components/InputField/InputField";
import { LocationAPIData, OrderData, SelectValue } from "../../../Types/types";
import { RegisterForm } from "../Order";

export interface DeliveryPageProps<T, J> {
  values: T;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  data?: J;
}

export const DeliveryInformation = ({
  values,
  setFieldValue,
  errors,
  touched,
}: DeliveryPageProps<RegisterForm, OrderData>) => {
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://locatesrilanka.herokuapp.com/provinces",
        {
          method: "GET",
        }
      );
      const dataProvinces: LocationAPIData[] = await response.json();
      setProvince([
        ...(dataProvinces?.map((item) => {
          return {
            id: item.id,
            value: item.name_en,
            label: item.name_en,
          };
        }) as any[]),
      ]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if ((values?.deliveryInfo?.province as SelectValue)?.id) {
        const response = await fetch(
          `https://locatesrilanka.herokuapp.com/districts/byprovince/${
            (values?.deliveryInfo?.province as SelectValue).id
          }`,
          {
            method: "GET",
          }
        );
        const district: LocationAPIData[] = await response.json();
        setDistrict([
          ...(district?.map((item) => {
            return {
              id: item.id,
              value: item.name_en,
              label: item.name_en,
            };
          }) as any[]),
        ]);
      }
    }
    fetchData();
  }, [values.deliveryInfo.province]);

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

          <div className='flex justify-between w-full'>
            <Select
              name='province'
              defaultValue={values.deliveryInfo.province || null}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='Province'
              onChange={(option) =>
                setFieldValue("deliveryInfo.province", option)
              }
              options={province}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='deliveryInfo.province' />

            <Select
              name='district'
              defaultValue={values.deliveryInfo.district || null}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='District'
              onChange={(option) =>
                setFieldValue("deliveryInfo.district", option)
              }
              options={district}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='deliveryInfo.district' />
          </div>

          <InputField
            errors={errors.deliveryInfo?.lineOne}
            touched={touched.deliveryInfo?.lineOne}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineOne'
            type='text'
            placeholder='Address'
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
