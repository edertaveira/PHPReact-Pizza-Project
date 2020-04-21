export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EMPTY = "EMPTY";

export function cartAddProduct(product, costs) {
  return { type: ADD, product, costs };
}

export function cartRemoveProduct(product, costs) {
  return { type: REMOVE, product, costs };
}

export function cartEmptyProduct() {
  return { type: EMPTY };
}
