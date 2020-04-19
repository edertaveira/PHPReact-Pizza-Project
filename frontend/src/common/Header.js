import React, { useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  FaPizzaSlice,
  FaShoppingBasket,
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { Layout, Menu, Badge, Affix, Button } from "antd";
import { userLoggedOutAction } from "../reducers/actions/userActions";
import { roles } from "../common/roles";
import Login from "../components/account/Login";

const Header = (props) => {
  const { user, history } = props;
  const [visible, setVisible] = useState(false);

  const logout = () => {
    props.userLoggedOutAction();
    props.history.push("/");
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuItems = [
    {
      name: "Home",
      link: "/",
      icon: <FaHome />,
      roles: [],
    },
  ];

  let indexSelected = menuItems.findIndex(
    (item) => history.location.pathname === item.link
  );
  let selected =
    indexSelected !== -1 ? `menu_${menuItems[indexSelected].name}` : "";

  return (
    <React.Fragment>
      <Login onClose={onClose} visible={visible} />
      <Affix offsetTop={0} style={{ zIndex: 16 }}>
        <Layout.Header>
          <div className="logo">
            <FaPizzaSlice /> <span>Pizza Club</span>
          </div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[selected]}>
            {menuItems.map((menu) => {
              const { roles, name, link, icon } = menu;

              if (!roles.length || roles.includes(user.role_id)) {
                return (
                  <Menu.Item key={`menu_${name}`}>
                    {icon}
                    <Link to={link}>{name}</Link>
                  </Menu.Item>
                );
              }
            })}
          </Menu>

          <div className="extra">
            <div className="extra-user">
              {user.name ? (
                <>
                  <FaUser className="user-icon" />
                  <span>{user.name}</span>
                  <Button
                    icon={<FaSignOutAlt />}
                    size="small"
                    type="danger"
                    onClick={logout}
                  >
                    Sign out
                  </Button>
                </>
              ) : (
                <Button
                  icon={<FaSignInAlt />}
                  size="small"
                  type="primary"
                  onClick={() => setVisible(true)}
                >
                  Sign in
                </Button>
              )}
            </div>
            <Badge className="basket" count={props.cart.amount}>
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
export default withRouter(
  connect(mapStateToProps, { userLoggedOutAction })(Header)
);
