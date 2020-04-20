import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  FaPizzaSlice,
  FaShoppingBasket,
  FaSignOutAlt,
  FaSignInAlt,
  FaArrowDown,
  FaTicketAlt,
  FaHeart,
} from "react-icons/fa";
import { Layout, Menu, Badge, Affix, Button, Dropdown, Divider } from "antd";
import { userLoggedOutAction } from "../reducers/actions/userActions";
import { removeAllFavorite } from "../reducers/actions/favoriteActions";
import Login from "../components/account/Login";

const Header = (props) => {
  const { user, history } = props;
  const [visible, setVisible] = useState(false);

  const logout = () => {
    props.userLoggedOutAction();
    props.removeAllFavorite();
    props.history.push("/");
  };

  const onClose = () => {
    setVisible(false);
  };

  const menuItems = [
    // {
    //   name: "Home",
    //   link: "/",
    //   icon: <FaHome />,
    //   roles: [],
    // },
  ];

  const menu = (
    <Menu className="menu-user">
      <Menu.Item>
        <Link to="/favorites">
          <FaHeart /> Favorites
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/orders">
          <FaTicketAlt /> My Orders
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Button
          icon={<FaSignOutAlt />}
          size="small"
          type="danger"
          onClick={logout}
        >
          Sign out
        </Button>
      </Menu.Item>
    </Menu>
  );

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
          <Link to="/" className="logo">
            <FaPizzaSlice /> <span>Pizza Club</span>
          </Link>
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
            <Badge className="basket" count={props.cart.amount}>
              <Link to="/cart">
                <FaShoppingBasket />
              </Link>
            </Badge>
            <div className="extra-user">
              {user.name ? (
                <Dropdown overlay={menu}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    {user.name} <FaArrowDown />
                  </a>
                </Dropdown>
              ) : (
                <Button
                  icon={<FaSignInAlt />}
                  size="small"
                  onClick={() => setVisible(true)}
                >
                  Sign in
                </Button>
              )}
            </div>
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
  connect(mapStateToProps, { userLoggedOutAction, removeAllFavorite })(Header)
);
