import React from "react";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import contactReducer from "./reducers";

const persistConfig = {
  key: "favContacts",
  storage,
  whitelist: ["favContacts"]
};

const pReducer = persistReducer(persistConfig, contactReducer);

const middleware = applyMiddleware(thunk, logger);

const store = createStore(pReducer, middleware);

const persistor = persistStore(store);

export { persistor, store };
