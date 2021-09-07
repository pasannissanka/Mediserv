import React from "react";
import { Card } from "../../Components/Card/Card";

type StoreProps = {};

export const Store = (props: StoreProps) => {
  return (
    <>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 gap-6 xl:grid-cols-6 sm:grid-cols-4'>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
};
