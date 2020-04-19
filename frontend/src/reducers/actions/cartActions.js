export const ADD = "ADD";
export const REMOVE = "REMOVE";
export const EMPTY = "EMPTY";

export function cartAddProduct(product) {
  return { type: ADD, product };
}

export function cartRemoveProduct(product) {
  return { type: REMOVE, product };
}

export function cartEmptyProduct() {
  return { type: EMPTY };
}
