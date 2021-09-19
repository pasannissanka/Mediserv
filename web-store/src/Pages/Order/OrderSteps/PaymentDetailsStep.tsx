import { ErrorMessage, Field, Form } from "formik";
import React from "react";
import Button from "../../../Components/Button/Button";

export const PaymentDetails = () => {
  return (
    <div className="container mx-auto pt-2">
      <div>Add your payment details here</div>
      <Form className="mx-auto">
        <Field
          className="appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm"
          name="cardNumber"
          type="text"
          placeholder="Card number"
        />
        <ErrorMessage name="cardNumber" />

        <Field
          className="appearance-none rounded-md relative block w-3/4 my-2 sm:text-sm"
          name="cardholderName"
          type="text"
          placeholder="Card holder name"
        />
        <ErrorMessage name="cardholderName" />

        <Field
          className="appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm "
          name="validthrough"
          type="text"
          placeholder="Valid through"
        />
        <ErrorMessage name="validthrough" />

        <Field
          className="appearance-none rounded-md relative block w-1/2 my-2 sm:text-sm"
          name="cvv"
          type="text"
          placeholder="CVV"
        />
        <ErrorMessage name="cvv" />
        <Button varient="outline-primary">Sumbit</Button>
      </Form>
    </div>
  );
};
