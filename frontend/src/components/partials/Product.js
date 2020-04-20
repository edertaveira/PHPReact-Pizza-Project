import React, { useState } from "react";
import { Card, Button, message } from "antd";
import { STORAGE_ROOT, API_ROOT } from "../../common/names";
import { cartAddProduct } from "../../reducers/actions/cartActions";
import {
  addFavorite,
  removeFavorite,
} from "../../reducers/actions/favoriteActions";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

const Product = (props) => {
  const { dispatch } = props;
  const [loading, setLoading] = useState(false);
  const item = props.product;

  const onAddFav = (product) => {
    setLoading(true);
    axios
      .post(`${API_ROOT}/api/favorite/add`, { product_id: product.product_id })
      .then((result) => {
        if (result.data.success) {
          dispatch(addFavorite(product));
          message.success("Favorited!");
        }
        setLoading(false);
      });
  };

  const onRemoveFav = (product) => {
    setLoading(true);
    axios
      .post(`${API_ROOT}/api/favorite/remove`, {
        product_id: product.product_id,
      })
      .then((result) => {
        if (result.data.success) {
          dispatch(removeFavorite(product));
          message.success("Unfavorited!");
        }
        setLoading(false);
      });
  };

  const favorite = (product) => {
    const favorites = props.favorite.products;
    const favorite = favorites.find(
      (item) => item.product_id === product.product_id
    );
    return favorite ? (
      <Button
        type="link"
        loading={loading}
        icon={<FaHeart />}
        onClick={() => onRemoveFav(product)}
      />
    ) : (
      <Button
        type="link"
        loading={loading}
        icon={<FaRegHeart />}
        onClick={() => onAddFav(product)}
      />
    );
  };

  return (
    <Card
      hoverable
      cover={<img alt="product-image" src={`${STORAGE_ROOT}/${item.image}`} />}
      actions={[
        <Button
          type="link"
          onClick={() => dispatch(cartAddProduct(item))}
          icon={<FaCartPlus />}
        />,
        favorite(item),
      ]}
    >
      <Card.Meta
        title={item.title}
        description={new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(item.price)}
      />
    </Card>
  );
};

const mapStateToProps = (appState) => ({
  user: appState.user,
  favorite: appState.favorite,
});
export default withRouter(connect(mapStateToProps)(Product));
