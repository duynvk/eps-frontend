import React, { lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
import PrivateRoute from './routes/PrivateRoute';
import Logout from './components/Logout/Logout'
import { isAuthenticated } from './utils/auth';

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));


function App() {
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route exact path="/login" render={(props) => (
          isAuthenticated() ? <Redirect to="/app" /> : <Login {...props} />
          )} />
          <Route path="/logout" component={Logout} />
          <PrivateRoute path="/app" component={Layout} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
