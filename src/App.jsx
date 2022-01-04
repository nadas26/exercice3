import deepmerge from "deepmerge";
import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import AppContext from "./AppContext";

const App = () => {
  return (
    <AppContextProvider>
      <Stats />
      <Actions />
      <Shop />
    </AppContextProvider>
  );
};
export default App;
