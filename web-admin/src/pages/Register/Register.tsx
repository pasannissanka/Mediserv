import { Form, Formik } from "formik";
import React, { useState } from "react";
import Button from "../../components/Button/Button";
import { StepperHeading } from "../../components/Stepper/StepperHeading";
import { LocationAPIData } from "../../Types/types";
import { RegisterPage01 } from "./RegisterPage01";
import { RegisterPage02 } from "./RegisterPage02";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
  houseNo: string;
  lineOne: string;
  lineTwo: string;
  province: LocationAPIData | "";
  district: LocationAPIData | "";
  town: string;
}

const formPages = [RegisterPage01, RegisterPage02];

export const Register = () => {
  const [stepper, setStepper] = useState(0);

  const handleNext = () => {
    if (stepper < 1) {
      setStepper(stepper + 1);
    }
  };

  const CurrentStepForm = formPages[stepper];

  return (
    <>
      <div className='flex-col w-3/5 m-auto'>
        <h1 className='font-bold text-4xl text-center mb-20'>Medi Serv</h1>

        <StepperHeading
          steps={[
            {
              title: "Step 01",
              description: "Owner details",
            },
            {
              title: "Step 02",
              description: "Location details",
            },
          ]}
          selectedIdx={stepper}
          setStepper={setStepper}
        />

        <div className='w-4/5 m-auto'>
          <Formik<RegisterForm>
            initialValues={{
              name: "",
              email: "",
              password: "",
              retypePassword: "",
              houseNo: "",
              lineOne: "",
              lineTwo: "",
              province: "",
              district: "",
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

                {stepper === 0 ? (
                  <span className='flex justify-end'>
                    <Button varient='primary' onClick={handleNext}>
                      Next
                    </Button>
                  </span>
                ) : (
                  <Button
                    type='submit'
                    varient='primary'
                    className='w-full group relative'
                  >
                    {!isSubmitting ? (
                      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                        <svg
                          className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                          xmlns='http://www.w3.org/2000/svg'
                          viewBox='0 0 20 20'
                          fill='currentColor'
                          aria-hidden='true'
                        >
                          <path
                            fillRule='evenodd'
                            d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                            clipRule='evenodd'
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className='absolute left-0 inset-y-0 flex items-center pl-3'>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                      </span>
                    )}
                    Sign in
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};
