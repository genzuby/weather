import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import "./style/main.scss";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    </div>
  );
};

export default App;
