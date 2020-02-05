// @flow
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppSwitch from "./app-switch";

const AppRouter = () => (
  <Router >
    <AppSwitch />
  </Router>
);

export default AppRouter;