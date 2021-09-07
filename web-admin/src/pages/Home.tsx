import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { Drawer } from "../components/Drawer/Drawer";
import { Footer } from "../components/Footer/Footer";
import { NavBar } from "../components/NavBar/NavBar";
import { NotFound } from "./NotFound";
import { Users } from "./Users/Users";

export const Home = () => {
  const [isDrawerOpen, setDrawerOpenState] = useState(true);

  const handelDrawer = () => {
    setDrawerOpenState(!isDrawerOpen);
  };

  return (
    <>
      <div className='flex h-screen overflow-y-hidden bg-gray-50'>
        <Drawer isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
        <div className='flex flex-col flex-1 h-full overflow-hidden'>
          <NavBar isDrawerOpen={isDrawerOpen} handleDrawerOpen={handelDrawer} />
          <main className='flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll'>
            <Switch>
              <Route exact path='/'>
                <div>Dashboard</div>
              </Route>
              <Route exact path='/users'>
                <Users />
              </Route>
              <Route exact path='/orders'>
                <div>Orders</div>
              </Route>
              <Route exact path='/activities'>
                <div>Activities</div>
              </Route>
              <Route exact path='/profile'>
                <div>Profile</div>
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
