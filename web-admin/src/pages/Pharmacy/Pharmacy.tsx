import { Form, Formik, FormikProps } from "formik";
import * as React from "react";
import { useContext } from "react";
import { DragAndDrop, Img } from "../../components/DragAndDrop/DragAndDrop";
import { InputField } from "../../components/InputField/InputField";
import { MapView } from "../../components/Leaflet/MapView";
import { AuthContext } from "../../Context/AuthContext";
import { ReactComponent as PharmacySvg } from "../../svg/pharmacy.svg";
import { CoordinateData, FileResponse, PharmacyData } from "../../Types/types";
import { EditViewField } from "./EditViewField";
import { latLng } from "leaflet";
import { LeafletMap } from "../../components/Leaflet/Marker";

export const Pharmacy = () => {
  const { token } = useContext(AuthContext);
  const [data, setData] = React.useState<PharmacyData>();
  const [bannerImg, setBannerImg] = React.useState<Img[]>();
  const [location, setLocation] = React.useState<CoordinateData>();

  React.useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pharmacies/user`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const pharmacyData: PharmacyData[] = await res.json();
      if (pharmacyData) {
        setData(pharmacyData[0]);
        setLocation({
          coord: latLng(
            pharmacyData[0].address.latitude,
            pharmacyData[0].address.longitude
          ),
          label: `${pharmacyData[0].title}, 
          ${pharmacyData[0].address.lineOne}, 
          ${pharmacyData[0].address.province}, 
          ${pharmacyData[0].address.district}`,
        });
      }
    }
    fetchData();
  }, [token]);

  const handleImageUpload = (formikProps: FormikProps<PharmacyData>) => {
    if (bannerImg) {
      const imgData = new FormData();
      imgData.append("file", bannerImg[0]);

      fetch(`${process.env.REACT_APP_API_URL}/api/file/upload`, {
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
                // formikProps.setFieldValue("bannerId", resData.id);
                handleFormSubmit("bannerId", formikProps, resData.id);
                setBannerImg([]);
              } else {
                console.log(resData);
              }
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    }
  };

  const handleFormSubmit = (
    field:
      | "title"
      | "description"
      | "contactNumber"
      | "email"
      | "address"
      | "bannerId",
    formikProps: FormikProps<PharmacyData>,
    bannerId?: string
  ) => {
    const { values, submitForm, setSubmitting } = formikProps;
    submitForm();

    let body: any = {};
    if (field === "bannerId" && bannerId) {
      body = {
        [field]: bannerId,
      };
    } else {
      body = {
        [field]: values[field],
      };
    }

    const updatePharmacy = async () => {
      setSubmitting(true);
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/pharmacies/${values.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const responseData: PharmacyData = await res.json();
      if (responseData) {
        setSubmitting(false);
        setData(responseData);
      }
    };
    updatePharmacy();
  };

  const handleFieldCancel = (
    field:
      | "title"
      | "description"
      | "contactNumber"
      | "email"
      | "address"
      | "bannerId",
    formikProps: FormikProps<PharmacyData>
  ) => {
    const { setFieldValue } = formikProps;
    if (data) {
      setFieldValue(field, data[field]);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl py-4 mb-2">Pharmacy</h1>
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
              bannerId: data.bannerId || "",
            }}
            onSubmit={(values) => {}}
          >
            {(formikProps) => {
              return (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <EditViewField
                        title="Banner"
                        onSubmit={(e) => {
                          handleImageUpload(formikProps);
                        }}
                        onCancel={(e) => {
                          setBannerImg([]);
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
                        <div className="w-full p-2">
                          {data.bannerId ? (
                            <img
                              className="rounded-lg"
                              src={`${process.env.REACT_APP_API_URL}/api/public/banner/download/${data.bannerId}`}
                              alt="PharmacyBanner"
                            />
                          ) : (
                            <div>
                              <PharmacySvg className="max-h-44 h- md:h-48 lg:h-60 my-8 w-full" />
                              <span className="flex justify-center text-gray-600">
                                Didn't set a banner yet
                              </span>
                            </div>
                          )}
                        </div>
                      </EditViewField>
                    </div>

                    {/* fields */}
                    <div className="col-span-1 md:col-span-2 flex flex-col w-full mx-auto">
                      <EditViewField
                        title="Title"
                        onSubmit={(e) => {
                          handleFormSubmit("title", formikProps);
                        }}
                        onCancel={(e) => {
                          handleFieldCancel("title", formikProps);
                        }}
                        editView={
                          <InputField
                            placeholder="New title"
                            className="rounded-md my-2 sm:text-sm mx-2 "
                            type="text"
                            name="title"
                          />
                        }
                      >
                        <div>{data && data?.title}</div>
                      </EditViewField>
                      <EditViewField
                        title="Description"
                        onSubmit={(e) => {
                          handleFormSubmit("description", formikProps);
                        }}
                        onCancel={(e) => {
                          handleFieldCancel("description", formikProps);
                        }}
                        editView={
                          <InputField
                            placeholder="New description"
                            className="rounded-md my-2 sm:text-sm mx-2 "
                            type="text"
                            name="description"
                          />
                        }
                      >
                        <div>{data && data?.description}</div>
                      </EditViewField>
                      <EditViewField
                        title="Contact number"
                        onSubmit={(e) => {
                          handleFormSubmit("contactNumber", formikProps);
                        }}
                        onCancel={(e) => {
                          handleFieldCancel("contactNumber", formikProps);
                        }}
                        editView={
                          <InputField
                            placeholder="New Contact number"
                            className="rounded-md my-2 sm:text-sm mx-2 "
                            type="text"
                            name="contactNumber"
                          />
                        }
                      >
                        <div>{data.contactNumber || "-"}</div>
                      </EditViewField>
                      <EditViewField
                        title="Email"
                        onSubmit={(e) => {
                          handleFormSubmit("email", formikProps);
                        }}
                        onCancel={(e) => {
                          handleFieldCancel("email", formikProps);
                        }}
                        editView={
                          <InputField
                            placeholder="New Email"
                            className="rounded-md my-2 sm:text-sm mx-2 "
                            type="text"
                            name="email"
                          />
                        }
                      >
                        <div>{data.email || "-"}</div>
                      </EditViewField>
                      <EditViewField
                        title="Address"
                        onSubmit={(e) => {
                          handleFormSubmit("address", formikProps);
                        }}
                        onCancel={(e) => {
                          handleFieldCancel("address", formikProps);
                        }}
                        editView={
                          <>
                            <div className="flex justify-between">
                              <InputField
                                label="Province"
                                placeholder="Province"
                                className="rounded-md my-2 sm:text-sm mx-2 "
                                type="text"
                                name="address.province"
                              />
                              <InputField
                                label="District"
                                placeholder="District"
                                className="rounded-md my-2 sm:text-sm mx-2 "
                                type="text"
                                name="address.district"
                              />
                            </div>
                            <div>
                              <InputField
                                as="textarea"
                                rows="4"
                                placeholder="Address"
                                className="rounded-md my-2 sm:text-sm mx-2 "
                                name="address.lineOne"
                              />
                            </div>
                          </>
                        }
                      >
                        <div>{data && data?.address.lineOne}</div>
                        <div>{data && data?.address.province},</div>
                        <div>{data && data?.address.district},</div>
                      </EditViewField>
                      <EditViewField
                        title="Location"
                        onSubmit={(e) => {}}
                        onCancel={(e) => {}}
                        editView={<></>}
                      >
                        <MapView
                          className="w-full h-96 lg:h-72 z-0 rounded-lg"
                          center={{ lat: 7.8731, lng: 80.7718 }}
                          zoom={6}
                          scrollWheelZoom={true}
                        >
                          {location && (
                            <LeafletMap<CoordinateData>
                              draggable={false}
                              location={location}
                            />
                          )}
                        </MapView>
                      </EditViewField>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        )}
      </div>
    </>
  );
};
