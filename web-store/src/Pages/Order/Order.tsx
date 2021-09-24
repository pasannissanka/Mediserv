import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { StepperHeading } from "../../Components/Stepper/StepperHeading";
import { Login } from "../Login/Login";
import { DeliveryInformation } from "./OrderSteps/DeliveryInformationStep";
import { PaymentDetails } from "./OrderSteps/PaymentDetailsStep";
import { Img, Prescription } from "./OrderSteps/PrescriptionStep";
import { Summery } from "./OrderSteps/SummeryStep";
import * as yup from "yup";

//type OrderTypes = {};
export interface RegisterForm {
  prescriptionImg: Img[] | any[];
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
  };
}

const prescriptionSchema = yup.array().min(1, "Prescription is required");

const deliveryInfoSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
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
  const [isOpen, setIsOpen] = useState(UserlogingStatus);
  //for open login only
  function UserlogingStatus() {
    return true;
  }

  const [stepper, setStepper] = useState(0);

  const handleNext = (formErrors: FormikErrors<RegisterForm>) => {
    if (stepper < 3) {
      if (stepper === 0 && !!!formErrors.prescriptionImg) {
        setStepper(stepper + 1);
      }
      if (stepper === 1 && !!!formErrors.deliveryInfo) {
        setStepper(stepper + 1);
      }
      if (stepper === 2 && !!!formErrors.paymentDetails) {
        setStepper(stepper + 1);
      }
    }
  };
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
                  />
                  <span className='flex justify-end py-4'>
                    <Button
                      type='button'
                      varient='primary'
                      onClick={(e) => {
                        validateForm().then((v) => {
                          console.log("here1", v);
                          setErrors(v);
                          if (stepper === 0) {
                            setTouched({
                              ...touched,
                              prescriptionImg: true,
                            } as FormikTouched<RegisterForm>);
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
                          handleNext(v);
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
