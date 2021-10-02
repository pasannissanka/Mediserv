import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Button from '../../components/Button/Button';

export interface DetailForm {
  title: string;
  description: string;
  address: string;
}
export const Pharmacy = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-2xl py-4 mb-1">Pharmacy</h1>
      </div>
    </>
  );
};
