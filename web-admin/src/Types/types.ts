import { ADMIN_TYPES } from "./enums";

export interface AuthContextState {
  user?: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  isLoading: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export interface IResponse<T> {
  status: string;
  payload: T;
  errors: any;
  metadata: any;
}

export interface ErrorResponse {
  timestamp: Date;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  details?: string[];
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

export interface OrderData {
  customer: UserData;
  deliveryAddress: AddressData;
  id: string;
  items: any[];
  paymentMethod: string;
  status: string;
  pharmacyId: string;
  prescriptionImgUrl: string;
  shippingCost: number;
  subTotal: number;
  tax: number;
  total: number;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  authorities: ADMIN_TYPES[];
}

export interface LoginResponse {
  user: UserData;
  token: string;
}

export interface LocationAPIData {
  id: number;
  name_en: string;
  name_si: string;
  name_ta: string;
  _id: string;
}
