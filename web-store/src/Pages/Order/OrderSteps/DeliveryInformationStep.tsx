import React, { useEffect, useState } from "react";
import { Menu } from "@headlessui/react";
import { ErrorMessage, FormikErrors, FormikTouched } from "formik";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { RawResult } from "leaflet-geosearch/dist/providers/bingProvider";
import { SearchResult } from "leaflet-geosearch/dist/providers/provider";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet/dist/leaflet.css";
import Select from "react-select";
import Button from "../../../Components/Button/Button";
import { InputField } from "../../../Components/InputField/InputField";
import useDebounce from "../../../Hooks/useDebounce";
import { LocationAPIData, OrderData, SelectValue } from "../../../Types/types";
import { RegisterForm } from "../Order";

export interface DeliveryPageProps<T, J> {
  values: T;
  errors: FormikErrors<T>;
  touched: FormikTouched<T>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  data?: J;
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

type OpenMapsLocationData = {
  coord: L.LatLng;
  input: string;
} & SearchResult<RawResult>;

L.Marker.prototype.options.icon = DefaultIcon;
export const DeliveryInformation = ({
  values,
  setFieldValue,
  errors,
  touched,
}: DeliveryPageProps<RegisterForm, OrderData>) => {
  const [province, setProvince] = useState<any[]>([]);
  const [district, setDistrict] = useState<any[]>([]);
  const [location, setLocation] = useState<OpenMapsLocationData | null>(null);
  const [locationList, setLocationList] = useState<
    OpenMapsLocationData[] | null
  >(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://locatesrilanka.herokuapp.com/provinces",
        {
          method: "GET",
        }
      );
      const dataProvinces: LocationAPIData[] = await response.json();
      setProvince([
        ...(dataProvinces?.map((item) => {
          return {
            id: item.id,
            value: item.name_en,
            label: item.name_en,
          };
        }) as any[]),
      ]);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if ((values?.deliveryInfo?.province as SelectValue)?.id) {
        const response = await fetch(
          `https://locatesrilanka.herokuapp.com/districts/byprovince/${
            (values?.deliveryInfo?.province as SelectValue).id
          }`,
          {
            method: "GET",
          }
        );
        const district: LocationAPIData[] = await response.json();
        setDistrict([
          ...(district?.map((item) => {
            return {
              id: item.id,
              value: item.name_en,
              label: item.name_en,
            };
          }) as any[]),
        ]);
      }
    }
    fetchData();
  }, [values.deliveryInfo.province]);

  const provider: OpenStreetMapProvider = new OpenStreetMapProvider({
    params: {
      countrycodes: "lk",
    },
  });

  const debouncedSearchTerm = useDebounce(values.deliveryInfo.lineOne, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      provider
        .search({
          query: debouncedSearchTerm,
        })
        .then((values) => {
          setIsSearching(false);
          setLocationList(values as any);
        })
        .catch((err) => {
          setIsSearching(false);
          console.log(err);
        });
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div className='container grid grid-cols-2 pt-2'>
        <div>
          <div className='mb-4'>Add your delivery information here</div>
          <InputField
            label='Name'
            errors={errors.deliveryInfo?.name}
            touched={touched.deliveryInfo?.name}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.name'
            type='text'
            placeholder='Name'
          />

          <InputField
            label='Email'
            errors={errors.deliveryInfo?.email}
            touched={touched.deliveryInfo?.email}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.email'
            type='email'
            placeholder='Email'
          />

          <InputField
            label='Phone Number'
            errors={errors.deliveryInfo?.phoneNumber}
            touched={touched.deliveryInfo?.phoneNumber}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.phoneNumber'
            type='text'
            placeholder='Phone number'
          />

          <div className='flex justify-between w-full'>
            <Select
              name='province'
              defaultValue={values.deliveryInfo.province || null}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='Province'
              onChange={(option) =>
                setFieldValue("deliveryInfo.province", option)
              }
              options={province}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='deliveryInfo.province' />

            <Select
              name='district'
              defaultValue={values.deliveryInfo.district || null}
              styles={{
                input: (base) => ({
                  ...base,
                  "input:focus": {
                    boxShadow: "none",
                  },
                }),
              }}
              placeholder='District'
              onChange={(option) =>
                setFieldValue("deliveryInfo.district", option)
              }
              options={district}
              className='appearance-none rounded-md relative block w-1/2 my-2 mr-1 sm:text-sm'
            />
            <ErrorMessage name='deliveryInfo.district' />
          </div>

          {/* <InputField
            label='Address'
            errors={errors.deliveryInfo?.lineOne}
            touched={touched.deliveryInfo?.lineOne}
            className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
            name='deliveryInfo.lineOne'
            type='text'
            placeholder='Address'
          /> */}

          <div className='flex w-full '>
            <InputField
              label='Address'
              errors={errors.deliveryInfo?.lineOne}
              touched={touched.deliveryInfo?.lineOne}
              className='appearance-none rounded-md relative block w-full my-2 sm:text-sm'
              name='deliveryInfo.lineOne'
              type='text'
              placeholder='Address'
            />
            <div className='flex flex-col mt-6 ml-2'>
              <Menu as='div' className='relative inline-block text-left'>
                <Menu.Button as={Button} varient='outline-primary'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-5 w-5'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                </Menu.Button>
                <Menu.Items className='h-80 overflow-auto z-50 absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {locationList?.map((locations, idx) => (
                    <Menu.Item as='div' key={idx}>
                      <div
                        className='p-3 text-gray-500 text-sm hover:text-gray-700 cursor-pointer'
                        onClick={() => {
                          setLocation({
                            ...locations,
                            coord: L.latLng(locations.y, locations.x),
                          } as any);
                        }}
                      >
                        {locations.label}
                      </div>
                    </Menu.Item>
                  ))}
                  {isSearching && (
                    <Menu.Item as='div' className='m-4'>
                      <span className='flex justify-center pl-3'>
                        <svg
                          className='animate-spin -ml-1 mr-3 h-10 w-10 text-primary-500'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                      </span>
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </div>
        <span className='w-full px-4 m-auto pt-6'>
          <MapContainer
            className='h-96'
            center={{ lat: 7.8731, lng: 80.7718 }}
            zoom={6}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <LeafletMap location={location} setLocation={setLocation} />
          </MapContainer>
        </span>
      </div>
    </>
  );
};

type LeafletMapProps = {
  location: OpenMapsLocationData | null;
  setLocation: React.Dispatch<
    React.SetStateAction<OpenMapsLocationData | null>
  >;
};

const LeafletMap = ({ location, setLocation }: LeafletMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (location !== null) {
      map.flyTo(location.coord, 17);
    }
  }, [map, location]);

  return (
    <>
      {location !== null && (
        <Marker
          position={location.coord}
          draggable
          eventHandlers={{
            dragend: (e) => {
              setLocation({
                ...location,
                coord: e.target.getLatLng(),
              });
            },
          }}
        >
          <Popup>{location.label}</Popup>
        </Marker>
      )}
    </>
  );
};
