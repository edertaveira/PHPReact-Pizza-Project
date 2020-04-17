import React from "react";
import { Provider } from "react-redux";
import { Route, Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import loading from "./common/loading";
import Loadable from "react-loadable";
import configureStore from "storage/configureStore";
import { routes } from "./common/names";

import "./App.css";
import HandyAuth from "./common/HandyAuth";

const asyncLogin = Loadable({
  loader: () => import("components/account/Login"),
  loading,
});

const asyncRegister = Loadable({
  loader: () => import("components/account/Register"),
  loading,
});

const asyncHome = Loadable({
  loader: () => import("components/Home"),
  loading,
});

const asyncHome = Loadable({
  loader: () => import("components/Cart"),
  loading,
});


const { store, persistor } = configureStore();
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HandyAuth history={history}>
          <Router history={history}>
            <Route exact path={routes.LOGIN} component={asyncLogin} />
            <Route exact path={routes.REGISTER} component={asyncRegister} />
            <Route exact path={routes.HOME} component={asyncHome} />
            <Route exact path={routes.CART} component={asyncCart} />
            {/* <ProtectedRoute
              exact
              path={routeNames.DASHBOARD_TPM_MANAGER}
              render={() => renderComponent(asyncPmManager)}
            /> */}
          </Router>
        </HandyAuth>
      </PersistGate>
    </Provider>
  );
}

export default App;
