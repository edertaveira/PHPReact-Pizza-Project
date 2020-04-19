import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { message } from "antd";

import routeNames from "constants/routeNames";

const ProtectedRoute = ({
  user,
  role,
  roles,
  redirectTo,
  flash,
  component,
  render,
  ...routeConfig
}) => {
  const protectedRender = props => {
    const authenticated = user != null;
    const authorized = !roles.length || roles.includes(role);

    if (authenticated && authorized) {
      if (component) {
        const Cmp = component;
        return <Cmp {...props} />;
      } else if (render) {
        return render(props);
      }
    } else {
      flash({ authenticated, authorized }, props);
      return <Redirect to={redirectTo(props)} />;
    }
  };

  return <Route render={protectedRender} {...routeConfig} />;
};

/**
 * Default flash implementation
 */
ProtectedRoute.flash = ({ authenticated, authorized }) => {
  if (!authenticated) {
    message.error("Authentication required. Please login.");
  } else if (!authorized) {
    message.error(
      "You don't have enough permissions to view this page. Please login as different user.",
    );
  }
};

ProtectedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.number),
  redirectTo: PropTypes.func,
  flash: PropTypes.func,
};

ProtectedRoute.defaultProps = {
  // by default allow all roles
  roles: [],
  // by default redirect to login page
  redirectTo: () => routeNames.LOGIN,
  // flash message if user is not
  flash: ProtectedRoute.flash,
};

export default connect(state => {
  return {
    user: state.user.user_id,
    role: state.user.user_role_id,
  };
})(ProtectedRoute);
