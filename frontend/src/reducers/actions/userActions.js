export const USER_LOGGED_IN = "USER_LOGGED_IN";
export const USER_LOGGED_OUT = "USER_LOGGED_OUT";

export function userLoggedInAction(user, token) {
  return { type: USER_LOGGED_IN, user, token };
}

export function userLoggedOutAction() {
  return { type: USER_LOGGED_OUT };
}
