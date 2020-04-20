export const ADD_FAV = "ADD_FAV";
export const REMOVE_FAV = "REMOVE_FAV";
export const ADD_ALL = "ADD_ALL";
export const REMOVE_ALL = "REMOVE_ALL";

export function addFavorite(product) {
  return { type: ADD_FAV, product };
}

export function removeFavorite(product) {
  return { type: REMOVE_FAV, product };
}

export function allFavorite(products) {
  return { type: ADD_ALL, products };
}

export function removeAllFavorite() {
  return { type: REMOVE_ALL };
}
