import React from "react";
import { Route, Switch } from "react-router";
import { NavBar } from "../../Components/NavBar/NavBar";

export const Home = () => {
  // const [isDrawerOpen, setDrawerOpenState] = useState(true);

  // const handelDrawer = () => {
  //   setDrawerOpenState(!isDrawerOpen);
  // };

  return (
    <div className='flex h-screen overflow-y-hidden bg-gray-50'>
      <div className='flex flex-col flex-1 h-full overflow-hidden'>
        <NavBar />
        <main className='flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll'>
          <Switch>
            <Route exact path='/'>
              <div>Dashboard</div>
            </Route>
            <Route exact path='/users'>
              <div>Dashboard</div>
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
              <div>Dashboard</div>
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};
