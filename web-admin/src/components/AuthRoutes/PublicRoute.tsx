import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

interface PublicRouteProps extends RouteProps {
  // component: any;
}

export default function PublicRoute(props: PublicRouteProps) {
  const { children, ...rest } = props;
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!user?.id) {
    return <Route {...rest} render={(props) => children} />;
  }

  return <Redirect to='/' />;
}
