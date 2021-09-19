import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import Button from "../../Components/Button/Button";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

type LoginProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Login = ({ isOpen, setIsOpen }: LoginProps) => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={(e) => {}}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div
                className="inline-block w-full max-w-md p-6 pb-16  overflow-hidden 
              text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              >
                <Dialog.Title as="h3" className="text-lg text-center font-medium leading-6 text-gray-900">
                  Login
                </Dialog.Title>
                <div className="mt-2">
                  <div>
                    <Formik<LoginForm>
                      initialValues={{ email: "", password: "", rememberMe: false }}
                      onSubmit={async (values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(true);
                        closeModal();
                      }}
                      validationSchema={validate}
                    >
                      {({ isSubmitting }) => (
                        <Form className="mt-8 space-y-4">
                          <Field className="w-80 mx-auto sm:text-sm" name="email" type="email" placeholder="Email" />
                          <ErrorMessage name="email">
                            {(msg) => <div style={{ color: "red", paddingLeft: "3rem" }}>{msg}</div>}
                          </ErrorMessage>

                          <Field
                            className="w-80 mx-auto sm:text-sm"
                            name="password"
                            type="password"
                            placeholder="Password"
                          />
                          <ErrorMessage name="password" className="pl-80">
                            {(msg) => <div style={{ color: "red", paddingLeft: "3rem" }}>{msg}</div>}
                          </ErrorMessage>

                          <div className="w-80 mx-auto flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              />
                              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                              </label>
                            </div>

                            <div className="text-sm">
                              <Link to="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                              </Link>
                            </div>
                          </div>

                          <div className="w-80 mx-auto">
                            <Button type="submit" varient="primary" className="w-full group relative">
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
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
