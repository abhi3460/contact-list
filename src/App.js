import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import ContactList from "./components/ContactList";
import FavContactList from "./components/FavContactList";
import "antd/dist/antd.css";
import "./App.css";

import { Provider } from "react-redux";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route exact path="/" component={ContactList} />
              <Route exact path="/favs" component={FavContactList} />
              {/* <Route exact path="/contact-details" component={ContactList} /> */}
            </Switch>
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
