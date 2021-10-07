import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { RegisterForm } from "./Register";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import { LocationAPIData, SelectValue } from "../../Types/types";
import Select from "react-select";

export interface RegisterPageProps<T> {
  values: T;
  setFieldValue: (field: string, value: any) => void;
}

export const RegisterPage03 = ({
  values,
  setFieldValue,
}: RegisterPageProps<RegisterForm>) => {
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
      if ((values?.province as SelectValue)?.id) {
        const response = await fetch(
          `https://locatesrilanka.herokuapp.com/districts/byprovince/${
            (values?.province as SelectValue).id
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
  }, [values?.province]);

  return (
    <>
      <div className='flex justify-between w-full'>
        <Select
          name='province'
          defaultValue={values.province || null}
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
          options={province}
          className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
        />
        <ErrorMessage name='province' />

        <Select
          name='district'
          defaultValue={values.district || null}
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
          options={district}
          className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
        />
        <ErrorMessage name='district' />
      </div>
      <Field
        className='focus:border-primary-300 focus:ring-primary-700 px-2 py-2 border-gray-300 border shadow-sm focus:ring-1 focus:ring-opacity-50appearance-none rounded-md relative block w-full my-2 sm:text-sm max-h-48'
        name='lineOne'
        type='text'
        placeholder='Address'
        as='textarea'
        rows={3}
      />
      <ErrorMessage name='Addres' />
      <MapContainer
        className='h-72 z-0'
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
  }, [map]);

  return null;
}
