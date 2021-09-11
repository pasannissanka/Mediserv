import React from "react";
import { AuthContextState } from "../Types/types";

export const AuthContext = React.createContext<AuthContextState>({
  user: undefined,
  setUser: () => {},
  isLoading: false,
  token: null,
  setToken: () => {},
});

export const useAuthContext = () => React.useContext(AuthContext);
