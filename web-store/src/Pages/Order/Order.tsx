import React, { useState } from "react";
import { Login } from "../Login/Login";

//type OrderTypes = {};

export const Order = () => {
  const [isOpen, setIsOpen] = useState(UserlogingStatus);
  function UserlogingStatus() {
    return true;
  }
  return (
    <>
      <div className="container mx-auto">
        Order
        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};
