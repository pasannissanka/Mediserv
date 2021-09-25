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
