import { ADD, REMOVE, EMPTY } from "./actions/cartActions";

const initialState = { products: {}, amount: 0, total: 0 };

function cartRoot(state = initialState, action) {
  const product = action.product;
  const curState = { ...state };
  let products = curState.products;
  let amount = curState.amount;
  let total = curState.total;
  const costs = parseFloat(action.costs);
  console.log(action)

  switch (action.type) {
    case ADD:
      if (products[product.product_id]) {
        products[product.product_id].amount += 1;
      } else {
        products[product.product_id] = action.product;
        products[product.product_id].amount = 1;
      }
      amount += 1;
      total += parseFloat(products[product.product_id].price);
      return { products, amount, total, costs };

    case REMOVE:
      products[product.product_id].amount -= 1;
      total -= parseFloat(products[product.product_id].price);
      if (products[product.product_id].amount === 0) {
        delete products[product.product_id];
      }
      amount -= 1;
      return { products, amount, total, costs };

    case EMPTY:
      return { products: [], amount: 0, total: 0 };

    default:
      return state;
  }
}

export default cartRoot;
