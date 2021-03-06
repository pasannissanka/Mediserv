import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../Components/Button/Button";
import { InputField } from "../../Components/InputField/InputField";
import { Modal } from "../../Components/Modal/Modal";
import { AuthContext } from "../../Context/AuthContext";
import { ADMIN_TYPES, LoginResponse, UserData } from "../../Types/types";

interface ILoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface IRegisterForm {
  name: string;
  email: string;
  password: string;
  retypePassword: string;
}

type LoginProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Login = ({ isOpen, setIsOpen }: LoginProps) => {
  const [registerState, setRegisterState] = useState<"LOGIN" | "REGISTER">(
    "LOGIN"
  );

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={registerState === "LOGIN" ? "Login" : "Register"}
      >
        {registerState === "LOGIN" ? (
          <LoginForm
            registerState={registerState}
            setRegisterState={setRegisterState}
            closeModal={closeModal}
          />
        ) : (
          <RegisterForm
            registerState={registerState}
            setRegisterState={setRegisterState}
            closeModal={closeModal}
          />
        )}
      </Modal>
    </>
  );
};

type LoginFormProps = {
  closeModal(): void;
  registerState: "LOGIN" | "REGISTER";
  setRegisterState: React.Dispatch<React.SetStateAction<"LOGIN" | "REGISTER">>;
};

const LoginForm = ({
  closeModal,
  registerState,
  setRegisterState,
}: LoginFormProps) => {
  const { setUser, setToken } = useContext(AuthContext);

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div>
      <Formik<ILoginForm>
        initialValues={{
          email: "",
          password: "",
          rememberMe: false,
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          console.log(values);
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
            console.log(data);
            setSubmitting(false);
            if (
              data &&
              data.user &&
              data.user.authorities.includes(ADMIN_TYPES.REG_CUSTOMER)
            ) {
              setUser(data.user);
              localStorage.setItem("auth-token", data.token);
              setToken(data.token);
              closeModal();
            } else if (data.error) {
              console.log(data.error);
              setFieldError("password", "Invalid Email/ Password");
            }
          } catch (error) {
            setSubmitting(false);
            console.log(error);
          }
        }}
        validationSchema={validate}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="mt-8 space-y-4 w-80 mx-auto">
            <InputField
              label="Email"
              className="rounded-md relative block my-2 sm:text-sm"
              name="email"
              type="email"
              placeholder="Email"
              errors={errors.email}
              touched={touched.password}
            />
            <InputField
              label="Password"
              className="rounded-md relative block my-2 sm:text-sm"
              name="password"
              type="password"
              placeholder="Password"
              errors={errors.password}
              touched={touched.password}
            />
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

            <div className="w-80 mx-auto text-sm">
              <Button
                onClick={() => setRegisterState("REGISTER")}
                className="font-medium w-full"
                type="button"
              >
                Doesn't have an account? Sign up.
              </Button>
            </div>

            <div className="w-80 mx-auto">
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

const RegisterForm = ({
  closeModal,
  registerState,
  setRegisterState,
}: LoginFormProps) => {
  const { setUser, setToken } = useContext(AuthContext);

  const validate = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    retypePassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  return (
    <div className="mt-8 space-y-4">
      <Formik<IRegisterForm>
        initialValues={{
          name: "",
          email: "",
          password: "",
          retypePassword: "",
        }}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          console.log(values);
          setSubmitting(true);
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_URL}/api/public/register`,
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
                  authorities: ["REG_CUSTOMER"],
                }),
              }
            );
            const dataRegister: UserData = await response.json();
            if (dataRegister && dataRegister.email) {
              // Chain login
              const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/public/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    email: dataRegister.email,
                    password: values.password,
                  }),
                }
              );
              const data: LoginResponse = await response.json();
              setSubmitting(false);
              if (
                data &&
                data.user &&
                data.user.authorities.includes(ADMIN_TYPES.REG_CUSTOMER)
              ) {
                setUser(data.user);
                localStorage.setItem("auth-token", data.token);
                setToken(data.token);
                closeModal();
              }
            } else {
              setFieldError("email", "Email already taken");
            }
          } catch (error) {
            setSubmitting(false);
            console.log(error);
          }
        }}
        validationSchema={validate}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="w-80 mx-auto">
            <InputField
              label="Full Name"
              className="rounded-md relative block my-2 sm:text-sm"
              name="name"
              type="text"
              placeholder="Full Name"
              touched={touched.name}
            />
            <InputField
              label="Email"
              className="rounded-md relative block my-2 sm:text-sm"
              name="email"
              type="email"
              placeholder="Email"
              touched={touched.email}
            />
            <InputField
              label="Password"
              className="rounded-md relative block my-2 sm:text-sm"
              name="password"
              type="password"
              placeholder="Password"
              touched={touched.password}
            />
            <InputField
              label="Re-enter Password"
              className="rounded-md relative block my-2 sm:text-sm"
              name="retypePassword"
              type="password"
              placeholder="Re-enter Password"
              touched={touched.retypePassword}
            />

            <div className="text-sm mb-2">
              <Button
                onClick={() => setRegisterState("LOGIN")}
                className="font-medium w-full"
                type="button"
              >
                Already have an account? Sign in
              </Button>
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
                      className="h-5 w-5"
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
                Sign up
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
