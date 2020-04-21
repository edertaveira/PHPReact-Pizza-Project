import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { routes } from "./common/names";
import loading from "./common/loading";
import Loadable from "react-loadable";
import configureStore from "./storage/configureStore";
import HandyAuth from "./common/HandyAuth";
import { Layout } from "antd";
import Header from "./common/Header";

import "./App.css";

const renderComponent = (AsyncFunc) => {
  return (
    <Layout>
      <Header />
      <Layout.Content>
        <AsyncFunc />
      </Layout.Content>
      <Layout.Footer>Copyright 2020</Layout.Footer>
    </Layout>
  );
};

const asyncHome = Loadable({
  loader: () => import("./components/Home"),
  loading,
});

const asyncCart = Loadable({
  loader: () => import("./components/Cart"),
  loading,
});

const asyncDetails = Loadable({
  loader: () => import("./components/Details"),
  loading,
});

const asyncCheckout = Loadable({
  loader: () => import("./components/Checkout"),
  loading,
});

const asyncOrders = Loadable({
  loader: () => import("./components/Orders"),
  loading,
});

const asyncFavorites = Loadable({
  loader: () => import("./components/Favorites"),
  loading,
});

const { store, persistor } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HandyAuth>
          <Router>
            <Route
              exact
              path={routes.HOME}
              render={() => renderComponent(asyncHome)}
            />
            <Route
              exact
              path={routes.CART}
              render={() => renderComponent(asyncCart)}
            />
            <Route
              exact
              path={routes.DETAILS}
              render={() => renderComponent(asyncDetails)}
            />
            <Route
              exact
              path={routes.CHECKOUT}
              render={() => renderComponent(asyncCheckout)}
            />
            <Route
              exact
              path={routes.ORDERS}
              render={() => renderComponent(asyncOrders)}
            />
            <Route
              exact
              path={routes.FAVORITES}
              render={() => renderComponent(asyncFavorites)}
            />
          </Router>
        </HandyAuth>
      </PersistGate>
    </Provider>
  );
}

export default App;
