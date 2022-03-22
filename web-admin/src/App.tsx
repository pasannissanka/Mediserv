import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/AuthRoutes/PrivateRoute";
import PublicRoute from "./components/AuthRoutes/PublicRoute";
import { AuthContext } from "./Context/AuthContext";
import { useFetch } from "./Hooks/useFetch";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { UserData } from "./Types/types";

function App() {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth-token")
  );

  const [user, setUser] = useState<UserData>();

  const { data, isLoading, serverError } = useFetch<UserData>(
    `${process.env.REACT_APP_API_URL}/api/users/user`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
      },
    }
  );

  useEffect(() => {
    console.log(serverError, data);
    if (data) {
      setUser(data);
    }
  }, [data, serverError]);

  const getApp = () => {
    return (
      <AuthContext.Provider
        value={{
          isLoading,
          setUser,
          user,
          token,
          setToken,
        }}
      >
        <Router>
          <Switch>
            <PublicRoute path="/auth">
              <Auth />
            </PublicRoute>
            <PrivateRoute path="/">
              <Home />
            </PrivateRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  };

  return (
    <Suspense fallback={<div>loading...</div>}>
      {!serverError && !data ? <div>Authenticating...</div> : getApp()}
    </Suspense>
  );
}

export default App;
