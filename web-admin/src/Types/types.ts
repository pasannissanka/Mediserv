import { ADMIN_TYPES } from "./enums";

export interface IResponse<T> {
  status: string;
  payload: T;
  errors: any;
  metadata: any;
}

export interface AddressData {
  houseNo: string;
  lineOne: string;
  lineTwo: string;
  province: string;
  district: string;
  town: string;
  longitude: number;
  latitude: number;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  userType: ADMIN_TYPES;
  address: AddressData;
}
