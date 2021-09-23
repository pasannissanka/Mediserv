import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import Button from "../../../Components/Button/Button";
import { VscCreditCard } from "react-icons/vsc";


export const PaymentDetails = () => {
  return (

    <div >
      <div>
        <Button className="h-32 w-32">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          Credit card
        </Button>
        <Button className="border-2 h-32 w-32">
          <div >
            <VscCreditCard size="3em" />
          </div >
          <div>
            Cash on delivery
          </div>

        </Button>
      </div>


      <Form className="mx-auto opacity-70 ">
        <Field
          as='input'
          disabled={true}
          className="appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm"
          name="cardNumber"
          type="text"
          placeholder="Card number"
        />
        <ErrorMessage name="cardNumber" />

        <Field
          as='input'
          disabled={true}
          className="appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm"
          name="cardholderName"
          type="text"
          placeholder="Card holder name"
        />
        <ErrorMessage name="cardholderName" />

        <Field
          as='input'
          disabled={true}
          className="appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm "
          name="validthrough"
          type="text"
          placeholder="Valid through"
        />
        <ErrorMessage name="validthrough" />

        <Field
          as='input'
          disabled={true}
          className="appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm"
          name="cvv"
          type="text"
          placeholder="CVV"
        />
        <ErrorMessage name="cvv" />
      </Form>
    </div>
  );
};
