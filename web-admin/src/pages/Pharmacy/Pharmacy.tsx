import { Formik } from "formik";
import * as React from "react";
import { useContext } from "react";
import { InputField } from "../../components/InputField/InputField";
import { AuthContext } from "../../Context/AuthContext";
import { useFetch } from "../../Hooks/useFetch";
import { ReactComponent as PharmacySvg } from "../../svg/pharmacy.svg";
import { PharmacyData } from "../../Types/types";
import { EditViewField } from "./EditViewField";

export const Pharmacy = () => {
  const { token } = useContext(AuthContext);

  const { data } = useFetch<PharmacyData[]>(
    "http://localhost:8080/api/pharmacies/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return (
    <>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl py-4 mb-2'>Pharmacy</h1>
        {/* banner  */}

        <Formik<PharmacyData>
          initialValues={
            data
              ? data[0]
              : {
                  address: {
                    district: "",
                    houseNo: "",
                    latitude: 0.0,
                    lineOne: "",
                    lineTwo: "",
                    longitude: 0.0,
                    province: "",
                    town: "",
                  },
                  title: "",
                  description: "",
                  id: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ values }) => (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='col-span-1'>
                <EditViewField
                  title='Banner'
                  onSubmit={(e) => console.log(e)}
                  editView={<div></div>}
                >
                  <div>
                    <PharmacySvg className='max-h-44 h- md:h-48 lg:h-60 my-8 w-full' />
                    <span className='flex justify-center text-gray-600'>
                      Didn't set a banner yet
                    </span>
                  </div>
                </EditViewField>
              </div>

              {/* fields */}
              <div className='col-span-1 md:col-span-2 flex flex-col w-full mx-auto'>
                <EditViewField
                  title='Title'
                  onSubmit={(e) => console.log("title", e)}
                  editView={
                    <InputField
                      placeholder='New title'
                      className='rounded-md my-2 sm:text-sm mx-2 '
                      type='text'
                      name='title'
                    />
                  }
                >
                  <div>{data && data[0]?.title}</div>
                </EditViewField>
                <EditViewField
                  title='Discription'
                  onSubmit={(e) => console.log(e)}
                  editView={
                    <InputField
                      placeholder='New description'
                      className='rounded-md my-2 sm:text-sm mx-2 '
                      type='text'
                      name='description'
                    />
                  }
                >
                  <div>{data && data[0]?.description}</div>
                </EditViewField>
                <EditViewField
                  title='Contact number'
                  onSubmit={(e) => console.log(e)}
                  editView={<input className='w-full' type='text' />}
                >
                  <div>07712345678</div>
                </EditViewField>
                <EditViewField
                  title='Email'
                  onSubmit={(e) => console.log(e)}
                  editView={<input className='w-full' type='text' />}
                >
                  <div>newPharmacy@gmail.com</div>
                </EditViewField>
                <EditViewField
                  title='Address'
                  onSubmit={(e) => console.log(e)}
                  editView={
                    <>
                      <div>
                        <InputField
                          placeholder='House no'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='address.houseNo'
                        />
                      </div>
                      <div>
                        <InputField
                          placeholder='District'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='address.district'
                        />
                      </div>
                      <div>
                        <InputField
                          placeholder='Province'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='address.province'
                        />
                      </div>
                    </>
                  }
                >
                  <div>{data && data[0]?.address.houseNo}</div>
                  <div>{data && data[0]?.address.district}</div>
                  <div>{data && data[0]?.address.province}</div>
                </EditViewField>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};
