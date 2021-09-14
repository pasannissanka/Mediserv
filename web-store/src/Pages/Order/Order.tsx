import React, { useState } from "react";
import { Login } from "../Login/Login";

//type OrderTypes = {};
type UserLogedIn = {
  status: boolean;
};

export const Order = () => {
  function UserlogingStatus() {
    return true;
  }

  const [isOpen, setIsOpen] = useState(UserlogingStatus);
  return (
    <>
      <div className="container mx-auto">
        Order
        <Login isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};
