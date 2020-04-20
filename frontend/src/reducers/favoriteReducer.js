import {
  ADD_FAV,
  REMOVE_FAV,
  ADD_ALL,
  REMOVE_ALL,
} from "./actions/favoriteActions";

const initialState = { products: [] };

function favoriteRoot(state = initialState, action) {
  const product = action.product;
  const curState = { ...state };
  let products = curState.products;
  const fprod = products.find((item) => item.product_id === product.product_id);

  switch (action.type) {
    case ADD_FAV:
      if (!fprod) {
        products.push(product);
      }
      return { products };

    case REMOVE_FAV:
      if (products.indexOf(fprod) >= 0) {
        products.splice(products.indexOf(fprod), 1);
      }
      return { products };

    case ADD_ALL:
      products = action.products ? action.products : [];
      return { products };

    case REMOVE_ALL:
      products = [];
      return { products };

    default:
      return state;
  }
}

export default favoriteRoot;
