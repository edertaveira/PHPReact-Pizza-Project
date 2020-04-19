import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Checkout = (props) => {
  return (
    <React.Fragment>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">
            <HomeOutlined /> Home
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Checkout</Breadcrumb.Item>
      </Breadcrumb>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
});
export default withRouter(connect(mapStateToProps)(Checkout));
