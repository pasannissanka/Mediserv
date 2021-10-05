import { Form, Formik } from "formik";
import * as React from "react";
import { useContext } from "react";
import { DragAndDrop, Img } from "../../components/DragAndDrop/DragAndDrop";
import { InputField } from "../../components/InputField/InputField";
import { AuthContext } from "../../Context/AuthContext";
import { ReactComponent as PharmacySvg } from "../../svg/pharmacy.svg";
import { FileResponse, PharmacyData } from "../../Types/types";
import { EditViewField } from "./EditViewField";

export const Pharmacy = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = React.useState<PharmacyData>();
  const [bannerImg, setBannerImg] = React.useState<Img[]>();

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:8080/api/pharmacies/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const pharmacyData: PharmacyData[] = await res.json();
      if (pharmacyData) {
        setData(pharmacyData[0]);
      }
    }
    fetchData();
  }, [token]);

  const handleImageUpload = (
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    submitForm: (() => Promise<void>) & (() => Promise<any>)
  ) => {
    if (bannerImg) {
      const imgData = new FormData();
      imgData.append("file", bannerImg[0]);

      fetch("http://localhost:8080/api/file/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: imgData,
      })
        .then((res) => {
          res
            .json()
            .then((resData: FileResponse) => {
              if (resData) {
                setFieldValue("bannerId", resData.id);
                submitForm();
              } else {
                console.log(resData);
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  console.log(data);

  return (
    <>
      <div className='container mx-auto px-4'>
        <h1 className='text-2xl py-4 mb-2'>Pharmacy</h1>
        {/* banner  */}
        {data && (
          <Formik<PharmacyData>
            initialValues={{
              address: data.address,
              description: data.description || "",
              id: data.id,
              title: data.title || "",
              contactNumber: data.contactNumber || "",
              email: data.email || "",
            }}
            onSubmit={(values) => {
              console.log(values);
              const updatePharmacy = async () => {
                console.log(values);
                const res = await fetch(
                  `http://localhost:8080/api/pharmacies/${values.id}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${token}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      address: values.address,
                      description: values.description,
                      title: values.title,
                      contactNumber: values.contactNumber,
                      email: values.email,
                      bannerId: values.bannerId,
                    } as PharmacyData),
                  }
                );
                const responseData: PharmacyData = await res.json();
                if (responseData) {
                  setData(responseData);
                }
              };
              updatePharmacy();
            }}
          >
            {({ values, submitForm, setFieldValue }) => (
              <Form>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='col-span-1'>
                    <EditViewField
                      title='Banner'
                      onSubmit={(e) => {
                        handleImageUpload(setFieldValue, submitForm);
                      }}
                      editView={
                        <div>
                          <DragAndDrop
                            values={bannerImg}
                            setValue={setBannerImg}
                          />
                        </div>
                      }
                    >
                      <div className='w-full p-2'>
                        {data.bannerId ? (
                          <img
                            className='rounded-lg'
                            src={`http://localhost:8080/api/public/banner/download/${data.bannerId}`}
                            alt='PharmacyBanner'
                          />
                        ) : (
                          <div>
                            <PharmacySvg className='max-h-44 h- md:h-48 lg:h-60 my-8 w-full' />
                            <span className='flex justify-center text-gray-600'>
                              Didn't set a banner yet
                            </span>
                          </div>
                        )}
                      </div>
                    </EditViewField>
                  </div>

                  {/* fields */}
                  <div className='col-span-1 md:col-span-2 flex flex-col w-full mx-auto'>
                    <EditViewField
                      title='Title'
                      onSubmit={(e) => {
                        submitForm();
                      }}
                      editView={
                        <InputField
                          placeholder='New title'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='title'
                        />
                      }
                    >
                      <div>{data && data?.title}</div>
                    </EditViewField>
                    <EditViewField
                      title='Discription'
                      onSubmit={(e) => {
                        submitForm();
                      }}
                      editView={
                        <InputField
                          placeholder='New description'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='description'
                        />
                      }
                    >
                      <div>{data && data?.description}</div>
                    </EditViewField>
                    <EditViewField
                      title='Contact number'
                      onSubmit={(e) => {
                        submitForm();
                      }}
                      editView={
                        <InputField
                          placeholder='New Contact number'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='contactNumber'
                        />
                      }
                    >
                      <div>{data.contactNumber || "-"}</div>
                    </EditViewField>
                    <EditViewField
                      title='Email'
                      onSubmit={(e) => {
                        submitForm();
                      }}
                      editView={
                        <InputField
                          placeholder='New Email'
                          className='rounded-md my-2 sm:text-sm mx-2 '
                          type='text'
                          name='email'
                        />
                      }
                    >
                      <div>{data.email || "-"}</div>
                    </EditViewField>
                    <EditViewField
                      title='Address'
                      onSubmit={(e) => {
                        submitForm();
                      }}
                      editView={
                        <>
                          <div className='flex justify-between'>
                            <InputField
                              label='Province'
                              placeholder='Province'
                              className='rounded-md my-2 sm:text-sm mx-2 '
                              type='text'
                              name='address.province'
                            />
                            <InputField
                              label='District'
                              placeholder='District'
                              className='rounded-md my-2 sm:text-sm mx-2 '
                              type='text'
                              name='address.district'
                            />
                          </div>
                          <div>
                            <InputField
                              as='textarea'
                              rows='4'
                              placeholder='Address'
                              className='rounded-md my-2 sm:text-sm mx-2 '
                              name='address.lineOne'
                            />
                          </div>
                        </>
                      }
                    >
                      <div>{data && data?.address.lineOne}</div>
                      <div>{data && data?.address.province},</div>
                      <div>{data && data?.address.district},</div>
                    </EditViewField>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
};
