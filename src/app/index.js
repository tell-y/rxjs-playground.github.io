import React, { Component } from "react";
import Header from "./components/header";
import Navbar from "./components/navbar";
import Playground, { Try } from "./core";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
} from "react-router-dom";

function NotFound(props) {
  return (
    <div>
      <h1> Not Found</h1>
      <p>
        {" "}
        Go back to <Link to={"/"}>Home</Link>
      </p>
    </div>
  );
}

const WithRouterNavbar = withRouter(Navbar);
const RoutePlayground = withRouter(Playground);
const RouteTry = withRouter(Try);

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id="app">
          <Header key={0} />
          <WithRouterNavbar key={1} />
          <div key={2} id="row">
            <div id="main">
              <Switch>
                <Route exact path="/">
                  <RoutePlayground />
                </Route>
                <Route exact path="/try">
                  <RouteTry />
                </Route>
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}
