import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";
import { useFetch } from "./Hooks/useFetch";
import { Home } from "./Pages/Home/Home";
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
    // console.log(serverError, data);
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
            <Route exact path="/login">
              <div>Login</div>
            </Route>
            <Route exact path="/register">
              <div>Register</div>
            </Route>
            <Route path="/">
              <Home />
            </Route>
            <Route path="*">
              <div>Not Found 404</div>
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
