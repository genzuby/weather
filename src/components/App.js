import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Home";
import Menu from "./Menu";
import "./style/main.scss";
import { CityContextStore } from "../context/SelectedCityContext";

const App = () => {
  return (
    <div className="App">
      <CityContextStore>
        <Menu />
        <BrowserRouter>
          <Route path="/" exact component={Home} />
        </BrowserRouter>
      </CityContextStore>
    </div>
  );
};

export default App;
