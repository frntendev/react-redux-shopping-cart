import * as Actions from "../constants";

export const addToCart = productId => (dispatch, getState) => {
  const productObj = getState().productInfo.result.products.find(
    s => s.productID === productId
  );
  dispatch({
    type: Actions.CARD_ADD,
    payload: productObj.unitsInStock > 0 ? productId : null
  });
};

export const removeFromCart = productId => dispatch => {
  dispatch({
    type: Actions.CARD_REMOVE,
    payload: productId
  });
};

export const destroyItem = (productId, quantity) => dispatch => {
  dispatch({
    type: Actions.CARD_DESTROY_ITEM,
    payload: {
      productId,
      quantity
    }
  });
};
