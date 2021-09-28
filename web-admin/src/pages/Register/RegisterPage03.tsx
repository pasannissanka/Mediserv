import { ErrorMessage, Field } from "formik";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { RegisterForm } from "./Register";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";

export interface RegisterPageProps<T> {
  values: T;
  setFieldValue: (field: string, value: any) => void;
}

export const RegisterPage03 = (props: RegisterPageProps<RegisterForm>) => {
  return (
    <>
      <Field
        className="focus:border-primary-300 focus:ring-primary-700 px-2 py-2 border-gray-300 border shadow-sm focus:ring-1 focus:ring-opacity-50appearance-none rounded-md relative block w-full my-2 sm:text-sm max-h-48"
        name="Adress"
        type="text"
        placeholder="Address"
        as="textarea"
        rows={3}
      />
      <ErrorMessage name="Addres" />
      <MapContainer className="h-72" center={{ lat: 7.8731, lng: 80.7718 }} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LeafletgeoSearch />
      </MapContainer>
    </>
  );
};

function LeafletgeoSearch() {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider({
      params: {
        countrycodes: "lk",
      },
    });

    const searchControl = GeoSearchControl({
      provider,
      marker: {
        icon: L.icon({
          iconSize: [25, 41],
          iconAnchor: [10, 41],
          popupAnchor: [2, -40],
          iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
        }),
      },
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(searchControl);
    };
  }, []);

  return null;
}
