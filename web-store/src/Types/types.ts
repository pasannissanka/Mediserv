export enum ADMIN_TYPES {
  SUPER_ADMIN,
  PHARMACY_USER,
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

export interface PharmacyData {
  address: AddressData;
  description: string;
  id: string;
  title: string;
}
