import "@elastic/eui/dist/eui_theme_dark.css";
import "@elastic/eui/dist/eui_theme_light.css";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

ReactDOM.render(
  <BrowserRouter basename="/gamecritic-frontend/">
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
