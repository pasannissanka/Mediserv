import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./Pages/Home/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login'>
          <div>Login</div>
        </Route>
        <Route exact path='/register'>
          <div>Register</div>
        </Route>
        <Route path='/'>
          <Home />
        </Route>
        <Route path='*'>
          <div>Not Found 404</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
