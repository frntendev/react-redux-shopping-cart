import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import { injectGlobal } from "react-emotion";
import store, { history } from "./store";
import App from "./scenes/app/containers";

injectGlobal`
  body{
    font-family: "PT Sans", arial, "Noto Sans Japanese", sans-serif;
    margin: 0;
    font-size: 14px;
    align-items: center;
    justify-content: center;
    -webkit-font-smoothing: antialiased;
    background-color: white;
    background-image: linear-gradient(90deg,rgba(245, 245, 245, 0.1) 50%,transparent 50%),linear-gradient(rgba(245, 245, 245, 0.1) 50%,transparent 50%);
    background-size: 5px 5px;
  }
`;

const target = document.querySelector("#root");

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
