import React from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { MyRouter } from "./components/MyRouter";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <MyRouter />
    </div>
  );
}

export default App;
