import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Cart = (props) => {
  return "Cart";
};

const mapStateToProps = (appState) => ({
  user: appState.user,
});
export default withRouter(connect(mapStateToProps)(Cart));
