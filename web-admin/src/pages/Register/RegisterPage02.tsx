import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { LocationAPIData } from "../../Types/types";
import { RegisterForm } from "./Register";
import { RegisterPageProps } from "./RegisterPage01";

export const RegisterPage02 = ({
  values,
  setFieldValue,
}: RegisterPageProps<RegisterForm>) => {
  const [locationData, setLocationData] = useState<{
    province: any[];
    district: any[];
    town: any[];
  }>({ district: [], province: [], town: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://locatesrilanka.herokuapp.com/provinces",
        {
          method: "GET",
        }
      );
      const dataProvinces: LocationAPIData[] = await response.json();
      setLocationData({
        ...locationData,
        province: dataProvinces?.map((item) => {
          return {
            id: item.id,
            value: item.name_en,
            label: item.name_en,
          };
        }) as any[],
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if ((values?.province as LocationAPIData).id) {
        const response = await fetch(
          `https://locatesrilanka.herokuapp.com/districts/byprovince/${
            (values?.province as LocationAPIData).id
          }`,
          {
            method: "GET",
          }
        );
        const district: LocationAPIData[] = await response.json();
        setLocationData({
          ...locationData,
          district: district?.map((item) => {
            return {
              id: item.id,
              value: item.name_en,
              label: item.name_en,
            };
          }) as any[],
        });
      }
    }
    fetchData();
  }, [values.province]);

  return (
    <>
      <div className='flex -mb-2'>
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
          options={locationData.district}
          className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
        />
        <ErrorMessage name='district' />
      </div>

      <Field
        className='appearance-none rounded-md relative block w-full sm:text-sm'
        name='town'
        type='text'
        placeholder='Town'
      />
      <ErrorMessage name='town' />

      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='lineOne'
        type='text'
        placeholder='Address line 01'
      />
      <ErrorMessage name='lineOne' />

      <Field
        className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
        name='lineTwo'
        type='text'
        placeholder='Address line 02'
      />
      <ErrorMessage name='lineTwo' />
    </>
  );
};
