import { ADMIN_TYPES } from "./enums";
import L from "leaflet";

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
  lineOne: string;
  province: string;
  district: string;
  longitude: number;
  latitude: number;
}

export interface PharmacyData {
  id: string;
  title: string;
  description: string;
  address: AddressData;
  contactNumber?: string;
  email?: string;
  bannerId?: string;
}

export interface OrderItemData {
  name: string;
  count: number;
  unitPrice: number;
  total: number;
}

export interface OrderData {
  customer: UserData;
  customerId?: string;
  deliveryAddress: AddressData;
  id: string;
  items: OrderItemData[];
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  pharmacy: PharmacyData;
  pharmacyId: string;
  prescriptionImgUrl: string;
  shippingCost: number;
  subTotal: number;
  tax: number;
  total: number;
  createdAt?: Date;
  modifiedAt?: Date;
}

export enum OrderStatus {
  NEW = "NEW",
  PROCESSED = "PROCESSED",
  DISPATCHED = "DISPATCHED",
  DELIVERED = "DELIVERED",
  REJECTED = "REJECTED",
}

export enum PaymentMethod {
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
  BANK_TRANSFER = "BANK_TRANSFER"
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  authorities: ADMIN_TYPES[];
  pharmacies: string[];
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

export interface SelectValue {
  id?: string;
  value: string;
  label: string;
}

export interface FileResponse {
  mimeType: string;
  id: string;
  fileName: string;
}

export interface CoordinateData {
  coord: L.LatLng;
  input?: string;
  label: string;
}
