export enum ADMIN_TYPES {
  REG_CUSTOMER = "REG_CUSTOMER",
}

export interface AuthContextState {
  user?: UserData;
  setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>;
  isLoading: boolean;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
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
  error?: string;
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
  paymentMethod: string;
  status: string;
  pharmacyId: string;
  prescriptionImgUrl: string;
  shippingCost: number;
  subTotal: number;
  tax: number;
  total: number;
  createdAt?: Date;
  modifiedAt?: Date;
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
