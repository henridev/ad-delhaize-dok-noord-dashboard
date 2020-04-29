import React, { useEffect, useState, createContext } from "react";
import { Route, Switch } from "react-router-dom";
import Orders from "./components/pages/Orders";
import EditPictures from "./components/pages/EditPictures";
import EditTexts from "./components/pages/EditTexts";
import EditSandwiches from "./components/pages/EditSandwiches";
import PersistentDrawerLeft from "./components/template/Navigation";
import UploadKasboek from "./components/pages/UploadKasboek";
import KasBoekGraphs from "./components/pages/KasBoekGraphs";
import KasBoek from "./components/pages/Kasboek";

export const ConfigContext = createContext();
const configValue = {};

function App() {
  return (
    <ConfigContext.Provider value={configValue}>
      <div className="App">
        <PersistentDrawerLeft>
          <Switch>
            <Route path="/" exact component={Orders} />
            <Route
              path="/overview/orders/dishes"
              exact
              component={Orders}
            />{" "}
            <Route
              path="/overview/orders/sandwiches"
              exact
              component={Orders}
            />{" "}
            <Route path="/overview/kasboek" exact component={KasBoek} />{" "}
            <Route
              path="/edit/orders/sandwiches"
              exact
              component={EditSandwiches}
            />{" "}
            <Route path="/edit/pictures" component={EditPictures} />{" "}
            <Route path="/edit/texts" component={EditTexts} />
            <Route path="/upload/kasboek" component={UploadKasboek} />
            <Route path="/dashboard/kasboek" component={KasBoekGraphs} />
            <Route render={() => <h2>404</h2>} />
          </Switch>
        </PersistentDrawerLeft>
      </div>
    </ConfigContext.Provider>
  );
}

export default App;
