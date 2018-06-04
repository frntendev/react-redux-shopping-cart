import * as Actions from "../constants";

const initialState = {
  cart: {}
};

export default (state = initialState.cart, action) => {
  switch (action.type) {
    case Actions.CARD_ADD:
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1
      };
    case Actions.CARD_REMOVE:
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) - 1
      };
    case Actions.CARD_DESTROY_ITEM:
      delete state[action.payload.productId];
      return { ...state };
    default:
      return state;
  }
};
