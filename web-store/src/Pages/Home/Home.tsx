import React from "react";
import { Route, Switch } from "react-router";
import { NavBar } from "../../Components/NavBar/NavBar";
import { Order } from "../Order/Order";
import { Store } from "../Store/Store";

export const Home = () => {
  return (
    <div className='flex h-screen overflow-y-hidden bg-gray-50'>
      <div className='flex flex-col flex-1 h-full overflow-hidden'>
        <NavBar />
        <main className='flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll'>
          <Switch>
            <Route exact path='/'>
              <Store />
            </Route>
            <Route exact path='/order'>
              <Order />
            </Route>
            <Route exact path='/profile'>
              <div>Profile</div>
            </Route>
            <Route path='*'>
              <div>Not found 404</div>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};
