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
            <VscCreditCard size="3em" />
          </div>
          Credit card
        </Button>
        <Button className="border-2 h-32 w-32">
          <div >
            <VscCreditCard size="3em" />
          </div >
          Cash on delivery
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
