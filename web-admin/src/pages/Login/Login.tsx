import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import { ErrorDialog } from "../../components/ErrorDialog/ErrorDialog";
import { AuthContext } from "../../Context/AuthContext";
import { LoginResponse } from "../../Types/types";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const Login = () => {
  const { setUser, setToken } = useContext(AuthContext);
  const [isErrorModal, setErrorModal] = useState<boolean>(false);
  const [{ errTitle, errMsg }, setErrData] = useState({
    errTitle: "",
    errMsg: "",
  });
  return (
    <>
      <div className="flex-col w-1/3 m-auto my-52">
        <h1 className="font-bold text-4xl text-center">MediServ</h1>
        <div className="">
          <Formik<LoginForm>
            initialValues={{ email: "", password: "", rememberMe: false }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                const response = await fetch(
                  `${process.env.REACT_APP_API_URL}/api/public/login`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: values.email,
                      password: values.password,
                    }),
                  }
                );
                const data: LoginResponse = await response.json();

                setSubmitting(false);
                if (data) {
                  setUser(data.user);
                  localStorage.setItem("auth-token", data.token);
                  setToken(data.token);
                } else {
                  setErrorModal(true);
                  setErrData({
                    errTitle: "An error occurred",
                    errMsg: "Permission Denied!",
                  });
                }
              } catch (error) {
                setSubmitting(false);
                setErrorModal(true);
                setErrData({
                  errTitle: "An error occurred",
                  errMsg: `${error}`,
                });
                console.log(error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-8 space-y-4">
                <Field
                  className="w-full sm:text-sm"
                  name="email"
                  type="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" />

                <Field
                  className="w-full sm:text-sm"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
                <ErrorMessage name="password" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember_me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link
                      to="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    varient="primary"
                    className="w-full group relative"
                  >
                    {!isSubmitting ? (
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      </span>
                    )}
                    Login
                  </Button>
                </div>

                <div>
                  <div className="flex items-center justify-end">
                    <div className="text-sm">
                      <Link
                        to="/auth/register"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Register your business to get started!
                      </Link>
                    </div>
                  </div>
                </div>
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
