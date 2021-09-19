import { Form, Formik } from "formik";
import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { StepperHeading } from "../../Components/Stepper/StepperHeading";
import { Login } from "../Login/Login";
import { DeliveryInformation } from "./OrderSteps/DeliveryInformationStep";
import { PaymentDetails } from "./OrderSteps/PaymentDetailsStep";
import { Img, Prescription } from "./OrderSteps/PrescriptionStep";
import { Summery } from "./OrderSteps/SummeryStep";

//type OrderTypes = {};
export interface RegisterForm {
  prescriptionImg: Img[] | any[];
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  retypePassword: string;
  houseNo: string;
  lineOne: string;
  lineTwo: string;
  town: string;
}

const formPages = [Prescription, DeliveryInformation, PaymentDetails, Summery];

export const Order = () => {
  const [isOpen, setIsOpen] = useState(UserlogingStatus);
  //for open login only
  function UserlogingStatus() {
    return true;
  }

  const [stepper, setStepper] = useState(0);

  const handleNext = () => {
    if (stepper < 3) {
      setStepper(stepper + 1);
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
                name: "",
                email: "",
                password: "",
                phoneNumber: "",
                retypePassword: "",
                houseNo: "",
                lineOne: "",
                lineTwo: "",
                town: "",
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log(values);
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form className='mt-8 space-y-4'>
                  <CurrentStepForm
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                  <span className='flex justify-end py-4'>
                    <Button varient='primary' onClick={handleNext}>
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
