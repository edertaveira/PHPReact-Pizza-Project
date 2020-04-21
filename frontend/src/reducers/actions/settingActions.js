export const UPDATE_CUR = "UPDATE_CUR";
export const UPDATE_COSTS = "UPDATE_COSTS";

export function currencyUpdate(currency, rate) {
  return { type: UPDATE_CUR, currency, rate };
}
export function costsUpdate(costs) {
  return { type: UPDATE_COSTS, costs };
}
