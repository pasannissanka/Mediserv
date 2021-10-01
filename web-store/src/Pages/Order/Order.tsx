import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useContext, useEffect, useState } from "react";
import Button from "../../Components/Button/Button";
import { StepperHeading } from "../../Components/Stepper/StepperHeading";
import { AuthContext } from "../../Context/AuthContext";
import { Login } from "../Login/Login";
import { DeliveryInformation } from "./OrderSteps/DeliveryInformationStep";
import { PaymentDetails } from "./OrderSteps/PaymentDetailsStep";
import { Img, Prescription } from "./OrderSteps/PrescriptionStep";
import { Summery } from "./OrderSteps/SummeryStep";
import * as yup from "yup";
import { string } from "yup/lib/locale";

//type OrderTypes = {};
export interface RegisterForm {
  prescriptionImg: Img[] | any[];
  prescriptionFileId: string;
  deliveryInfo: {
    name: string;
    email: string;
    phoneNumber: string;
    province: string;
    district: string;
    lineOne: string;
    lineTwo: string;
  };
  paymentDetails: {
    deliveryMethod: string;
    cardNumber: string;
    cardholderName: string;
    validthrough: string;
    cvv: string;
  };
}

const prescriptionSchema = yup.array().min(1, "Prescription is required");

const deliveryInfoSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  province: yup.string().required("Province is required"),
  district: yup.string().required("District is required"),
  lineOne: yup.string().required("Address line one is required"),
  lineTwo: yup.string().required("Address line two is required"),
});

const paymentDetailsSchema = yup.object().shape({
  deliveryMethod: yup.string().required(),
});

const validationSchema = yup.object().shape({
  prescriptionImg: prescriptionSchema,
  deliveryInfo: deliveryInfoSchema,
  paymentDetails: paymentDetailsSchema,
});

const formPages = [Prescription, DeliveryInformation, PaymentDetails, Summery];

export const Order = () => {
  const { token, user } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token && user) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [token, user]);

  const [stepper, setStepper] = useState(0);

  const CurrentStepForm = formPages[stepper];

  return (
    <>
      <div className='container mx-auto p-0'>
        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* stepper */}
        <div className='flex-col w-3/5 mx-auto bg-white rounded-lg'>
          <div className='mx-4 py-4'>
            <StepperHeading
              steps={[
                {
                  title: "Prescription",
                },
                {
                  title: "Delivery information",
                },
                {
                  title: "Payment details",
                },
                {
                  title: "Summery",
                },
              ]}
              selectedIdx={stepper}
              setStepper={setStepper}
            />
          </div>

          <div className='w-4/5 m-auto'>
            <Formik<RegisterForm>
              initialValues={{
                prescriptionImg: [],
                prescriptionFileId: "",
                deliveryInfo: {
                  name: "",
                  email: "",
                  phoneNumber: "",
                  lineOne: "",
                  lineTwo: "",
                  district: "",
                  province: "",
                },
                paymentDetails: {
                  deliveryMethod: "",
                  cardNumber: "",
                  cardholderName: "",
                  validthrough: "",
                  cvv: "",
                },
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values);
              }}
              validationSchema={validationSchema}
            >
              {({
                isSubmitting,
                values,
                setFieldValue,
                validateForm,
                setErrors,
                errors,
                setTouched,
                touched,
              }) => (
                <Form className='mt-8 space-y-4'>
                  <CurrentStepForm
                    values={values}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />

                  <span className='flex justify-between'>
                    <Button
                      className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
                      onClick={(e) => {
                        if (stepper === 0) {
                          setStepper(stepper);
                        } else {
                          setStepper(stepper - 1);
                        }
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type='button'
                      varient='primary'
                      onClick={(e) => {
                        validateForm().then((formErrors) => {
                          setErrors(formErrors);

                          if (stepper === 0) {
                            setTouched({
                              ...touched,
                              prescriptionImg: true,
                            } as FormikTouched<RegisterForm>);
                            if (!formErrors.prescriptionImg) {
                              const imgData = new FormData();
                              imgData.append("file", values.prescriptionImg[0]);

                              fetch("http://localhost:8080/api/file/upload", {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                                body: imgData,
                              })
                                .then((response) => {
                                  response.json().then((data) => {
                                    console.log(data);
                                    setFieldValue(
                                      "prescriptionFileId",
                                      data.id
                                    );
                                    setStepper(stepper + 1);
                                  });
                                })
                                .catch((error) => console.log(error));
                            }
                          }
                          if (stepper === 1) {
                            setTouched({
                              ...touched,
                              deliveryInfo: {
                                ...touched.deliveryInfo,
                                name: true,
                                email: true,
                                phoneNumber: true,
                                province: true,
                                district: true,
                                lineOne: true,
                                lineTwo: true,
                              },
                            } as FormikTouched<RegisterForm>);
                          }
                          if (stepper === 2) {
                            if (
                              !formErrors.deliveryInfo &&
                              !formErrors.paymentDetails
                            ) {
                              fetch("http://localhost:8080/api/orders/", {
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                  customerId: user?.id,
                                  pharmacyId: "",
                                  paymentMethod:
                                    values.paymentDetails.deliveryMethod,
                                  prescriptionImgUrl: values.prescriptionFileId,
                                  deliveryAddress: {
                                    lineOne: values.deliveryInfo.lineOne,
                                    lineTwo: values.deliveryInfo.lineTwo,
                                    province: values.deliveryInfo.province,
                                    district: values.deliveryInfo.district,
                                  },
                                }),
                              })
                                .then((response) => {
                                  response.json().then((data) => {
                                    console.log(data);
                                    setStepper(stepper + 1);
                                  });
                                })
                                .catch((error) => console.log(error));
                            }
                          }
                        });
                      }}
                    >
                      Next
                    </Button>
                  </span>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
