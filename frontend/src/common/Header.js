import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { FaPizzaSlice, FaShoppingBasket } from "react-icons/fa";
import { Layout, Menu, Badge, Affix } from "antd";

const Header = (props) => {
  return (
    <React.Fragment>
      <Affix offsetTop={0} style={{ zIndex: 16 }}>
        <Layout.Header>
          <div className="logo">
            <FaPizzaSlice /> <span>Pizza Club</span>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to="/"> Home</Link>
            </Menu.Item>
          </Menu>

          <div className="extra">
            <Badge count={props.cart.amount}>
              <Link to="/cart">
                <FaShoppingBasket />
              </Link>
            </Badge>
          </div>
        </Layout.Header>
      </Affix>
    </React.Fragment>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  cart: appState.cart,
});
export default withRouter(connect(mapStateToProps)(Header));
