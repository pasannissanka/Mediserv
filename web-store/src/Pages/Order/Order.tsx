import { Form, Formik, FormikErrors, FormikTouched } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router";
import * as yup from "yup";
import Button from "../../Components/Button/Button";
import { StepperHeading } from "../../Components/Stepper/StepperHeading";
import { AuthContext } from "../../Context/AuthContext";
import { OrderData } from "../../Types/types";
import { Login } from "../Login/Login";
import { DeliveryInformation } from "./OrderSteps/DeliveryInformationStep";
import { PaymentDetails } from "./OrderSteps/PaymentDetailsStep";
import { Img, Prescription } from "./OrderSteps/PrescriptionStep";
import { Summery } from "./OrderSteps/SummeryStep";

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
  const [stepper, setStepper] = useState(0);
  const { token, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const pharmacyId = new URLSearchParams(useLocation().search).get("id");
  const [orderResponse, setOrderResponse] = useState<OrderData>();
  const history = useHistory();

  useEffect(() => {
    if (token && user) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [token, user]);

  const CurrentStepForm = formPages[stepper];

  const handleSubmit = (
    validateForm: (values?: any) => Promise<FormikErrors<RegisterForm>>,
    setErrors: (errors: FormikErrors<RegisterForm>) => void,
    setTouched: (
      touched: FormikTouched<RegisterForm>,
      shouldValidate?: boolean | undefined
    ) => void,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void,
    values: RegisterForm,
    touched: FormikTouched<RegisterForm>
  ) => {
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
                if (data) {
                  setFieldValue("prescriptionFileId", data.id);
                  setStepper(stepper + 1);
                }
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
        setStepper(stepper + 1);
      }
      if (stepper === 2) {
        if (!formErrors.deliveryInfo && !formErrors.paymentDetails) {
          fetch("http://localhost:8080/api/orders/", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId: user?.id,
              pharmacyId: pharmacyId,
              paymentMethod: values.paymentDetails.deliveryMethod,
              prescriptionImgUrl: values.prescriptionFileId,
              deliveryAddress: {
                lineOne: values.deliveryInfo.lineOne,
                province: values.deliveryInfo.province,
                district: values.deliveryInfo.district,
              },
            }),
          })
            .then((response) => {
              response.json().then((data: OrderData) => {
                if (data) {
                  setStepper(stepper + 1);
                  setOrderResponse(data);
                }
              });
            })
            .catch((error) => console.log(error));
        }
      }
      if (stepper === 3) {
        values.prescriptionImg.forEach((file) =>
          URL.revokeObjectURL(file.preview)
        );
        history.push("/");
      }
    });
  };

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
              linear={true}
            />
          </div>

          <div className='w-4/5 m-auto'>
            <Formik<RegisterForm>
              initialValues={{
                prescriptionImg: [],
                prescriptionFileId: "",
                deliveryInfo: {
                  name: user?.name || "",
                  email: user?.email || "",
                  phoneNumber: "",
                  lineOne: "",
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
                    data={orderResponse}
                  />

                  <span
                    className={`flex ${
                      stepper === 1 || stepper === 2
                        ? "justify-between "
                        : "justify-end"
                    }`}
                  >
                    {stepper === 1 || stepper === 2 ? (
                      <Button
                        varient='outline-primary'
                        onClick={(e) => {
                          setStepper(stepper - 1);
                        }}
                      >
                        Back
                      </Button>
                    ) : (
                      <></>
                    )}
                    <Button
                      type='button'
                      varient='primary'
                      onClick={(e) =>
                        handleSubmit(
                          validateForm,
                          setErrors,
                          setTouched,
                          setFieldValue,
                          values,
                          touched
                        )
                      }
                    >
                      {stepper !== 3 ? "Next" : "Done"}
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
