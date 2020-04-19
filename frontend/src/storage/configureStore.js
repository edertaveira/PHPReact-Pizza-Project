import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "../reducers/appReducer";
import logger from "redux-logger";

const persistConfig = {
  key: "Innoscripta",
  storage,
  debug: true,
};

const persistedReducer = persistReducer(persistConfig, appReducer);

const configureStore = () => {
  const store = createStore(persistedReducer, applyMiddleware(logger));
  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
