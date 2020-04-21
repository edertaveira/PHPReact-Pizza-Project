import { UPDATE_CUR, UPDATE_COSTS } from "./actions/settingActions";

const initialState = {
  currency: "EUR",
  rate: 1.0,
  costs: 5.0,
  locale: "de-DE",
};

function currencyRoot(state = initialState, action) {
  const curState = { ...state };

  switch (action.type) {
    case UPDATE_CUR:
      curState.currency = action.currency;
      curState.rate = action.rate;
      curState.locale = action.currency === "USD" ? "en-US" : "de-DE";
      return { ...curState };

    case UPDATE_COSTS:
      curState.costs = action.costs;
      return { ...curState };

    default:
      return state;
  }
}

export default currencyRoot;
