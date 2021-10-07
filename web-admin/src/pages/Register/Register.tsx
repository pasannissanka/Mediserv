import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import { StepperHeading } from "../../components/Stepper/StepperHeading";
import { AuthContext } from "../../Context/AuthContext";
import {
  LocationAPIData,
  LoginResponse,
  PharmacyData,
  UserData,
} from "../../Types/types";
import { ErrorDialog } from "../../components/ErrorDialog/ErrorDialog";
import { RegisterPage01 } from "./RegisterPage01";
import { RegisterPage02 } from "./RegisterPage02";
import { RegisterPage03 } from "./RegisterPage03";
import { ADMIN_TYPES } from "../../Types/enums";

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
  title: string;
  description: string;
  houseNo: string;
  lineOne: string;
  lineTwo: string;
  province: LocationAPIData | "";
  district: LocationAPIData | "";
  town: string;
  longitude: string;
  latitude: string;
}

const formPages = [RegisterPage01, RegisterPage02, RegisterPage03];

export const Register = () => {
  const [stepper, setStepper] = useState(0);
  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [{ errTitle, errMsg }, setErrData] = useState({
    errTitle: "",
    errMsg: "",
  });

  const { setUser, setToken } = useContext(AuthContext);

  const handleNext = () => {
    if (stepper < 2) {
      setStepper(stepper + 1);
    }
  };

  const CurrentStepForm = formPages[stepper];

  return (
    <>
      <div className='flex-col w-3/5 mx-auto my-24'>
        <h1 className='font-bold text-4xl text-center mb-8'>MediServ</h1>

        <StepperHeading
          steps={[
            {
              title: "Owner details",
            },
            {
              title: "Pharmacy details",
            },
            {
              title: "Location details",
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
              title: "",
              description: "",
              houseNo: "",
              lineOne: "",
              lineTwo: "",
              province: "",
              district: "",
              town: "",
              longitude: "",
              latitude: "",
            }}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              try {
                const response = await fetch(
                  "http://localhost:8080/api/public/register",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: values.name,
                      email: values.email,
                      password: values.password,
                      rePassword: values.retypePassword,
                      authorities: ["PHARMACY_USER"],
                    }),
                  }
                );
                const authData: UserData = await response.json();
                if (!authData.id) {
                  setErrorModal(true);
                  setErrData({
                    errTitle: "An error occurred",
                    errMsg: "Oops something went wrong, Please try again!",
                  });
                }
                setSubmitting(false);

                if (authData.id) {
                  const response = await fetch(
                    "http://localhost:8080/api/public/pharmacies/",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        title: values.title,
                        description: values.description,
                        address: {
                          houseNo: values.houseNo,
                          lineOne: values.lineOne,
                          lineTwo: values.lineTwo,
                          province: values.province,
                          district: values.district,
                          town: values.town,
                          longitude: values.longitude,
                          latitude: values.latitude,
                        },
                        adminId: authData.id,
                      }),
                    }
                  );
                  const pharmacyData: PharmacyData = await response.json();
                  setSubmitting(false);

                  //if success then login
                  if (pharmacyData) {
                    const response = await fetch(
                      "http://localhost:8080/api/public/login",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          email: authData.email,
                          password: values.password,
                        }),
                      }
                    );
                    const data: LoginResponse = await response.json();
                    if (
                      data &&
                      (data.user.authorities.includes(
                        ADMIN_TYPES.PHARMACY_USER
                      ) ||
                        data.user.authorities.includes(ADMIN_TYPES.SUPER_ADMIN))
                    ) {
                      setUser(data.user);
                      localStorage.setItem("auth-token", data.token);
                      setToken(data.token);
                      setSubmitting(true);
                    }
                  }
                }
              } catch (error) {
                setSubmitting(false);
                setErrorModal(true);
                setErrData({
                  errTitle: "Network error",
                  errMsg:
                    "Cannot connect the computer to the server, Please try again!",
                });
              }
              resetForm();
            }}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className='mt-8 space-y-4'>
                <CurrentStepForm
                  values={values}
                  setFieldValue={setFieldValue}
                />
                {stepper !== 2 ? (
                  <span className='flex justify-end'>
                    <Button
                      type='button'
                      varient='primary'
                      onClick={handleNext}
                    >
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
                    Sign up
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <ErrorDialog
          isErrorModal={isErrorModal}
          setErrorModal={setErrorModal}
          errMsg={errMsg}
          errTitle={errTitle}
        />
      </div>
    </>
  );
};
