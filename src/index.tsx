import React from "react";
import { LayoutContext } from "./context/layouts.repository.context";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { LayotsRepository } from "./components/Map/store/layouts.repository";
import { devTools } from "@ngneat/elf-devtools";
import "./index.css";

devTools({
  name: "Map",
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <LayoutContext.Provider value={{ repository: new LayotsRepository() }}>
    <App />
  </LayoutContext.Provider>
);
