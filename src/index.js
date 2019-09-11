import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

// redux dev tool
const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhencers(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
