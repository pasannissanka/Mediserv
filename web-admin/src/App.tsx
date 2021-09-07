import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from "./pages/Auth/Auth";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
