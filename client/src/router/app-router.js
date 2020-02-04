import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppSwitch from "./app-switch";

const AppRouter = props => (
  <Router {...props}>
    <AppSwitch />
  </Router>
);

export default AppRouter;