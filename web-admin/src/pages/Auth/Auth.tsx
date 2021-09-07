import React from "react";
import { Route, Switch, useRouteMatch } from "react-router";
import { ReactComponent as UnDrawMedicineSVG } from "../../svg/undraw_medicine_red.svg";
import { Login } from "../Login/Login";
import { NotFound } from "../NotFound";
import { Register } from "../Register/Register";

export const Auth = () => {
  const { path } = useRouteMatch();
  return (
    <>
      <div className='flex h-screen'>
        <div className='flex-auto w-2/5 bg-primary-500'>
          <span className='flex-inline justify-center mx-auto'>
            <UnDrawMedicineSVG className='w-1/2 mx-auto my-auto h-full' />
          </span>
        </div>
        <div className='w-3/5 h-screen flex'>
          <div className='w-full m-auto'>
            <Switch>
              <Route exact path={path}>
                <Login />
              </Route>
              <Route path={`${path}/register`}>
                <Register />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
};
